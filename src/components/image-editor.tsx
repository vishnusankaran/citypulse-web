import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Move,
  Crop,
  Scale,
  Trash2,
  Upload,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

type Tool = 'move' | 'select' | 'crop' | 'scale' | 'delete';
type ImageObject = {
  id: string;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export function ImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('move');
  const [images, setImages] = useState<ImageObject[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageObject | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debugger;
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newImage: ImageObject = {
            id: Math.random().toString(36).substr(2, 9),
            image: img,
            x: window.innerWidth / 2 - img.width / 2,
            y: window.innerHeight / 2 - img.height / 2,
            width: img.width,
            height: img.height,
            rotation: 0,
          };
          setImages((prev) => [...prev, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  // Handle canvas click
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if click is on an image
      const clickedImage = images.find((img) => {
        return (
          x >= img.x &&
          x <= img.x + img.width &&
          y >= img.y &&
          y <= img.y + img.height
        );
      });

      setSelectedImage(clickedImage || null);
    },
    [images]
  );

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!selectedImage) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [selectedImage]
  );

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !selectedImage) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImage.id
            ? { ...img, x: img.x + dx, y: img.y + dy }
            : img
        )
      );

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, selectedImage, dragStart]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle scale change
  const handleScaleChange = useCallback(
    (value: number[]) => {
      if (!selectedImage) return;
      setScale(value[0]);
      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImage.id
            ? {
                ...img,
                width: selectedImage.width * value[0],
                height: selectedImage.height * value[0],
              }
            : img
        )
      );
    },
    [selectedImage]
  );

  // Handle rotation
  const handleRotate = useCallback(
    (direction: 'left' | 'right') => {
      if (!selectedImage) return;
      const newRotation = direction === 'left' ? rotation - 90 : rotation + 90;
      setRotation(newRotation);
      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImage.id ? { ...img, rotation: newRotation } : img
        )
      );
    },
    [selectedImage, rotation]
  );

  // Handle delete
  const handleDelete = useCallback(() => {
    if (!selectedImage) return;
    setImages((prev) => prev.filter((img) => img.id !== selectedImage.id));
    setSelectedImage(null);
  }, [selectedImage]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw images
    images.forEach((img) => {
      ctx.save();
      ctx.translate(img.x + img.width / 2, img.y + img.height / 2);
      ctx.rotate((img.rotation * Math.PI) / 180);
      ctx.drawImage(
        img.image,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );
      ctx.restore();

      // Draw selection border
      if (selectedImage?.id === img.id) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x, img.y, img.width, img.height);
      }
    });
  }, [images, selectedImage]);

  return (
    <div className="relative h-screen w-full bg-slate-50">
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 size-4" />
            Upload Image
          </Button>
        </label>

        <Tabs defaultValue="move" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="move" onClick={() => setTool('move')}>
              <Move className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="select" onClick={() => setTool('select')}>
              <Maximize2 className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="crop" onClick={() => setTool('crop')}>
              <Crop className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="scale" onClick={() => setTool('scale')}>
              <Scale className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="delete" onClick={() => setTool('delete')}>
              <Trash2 className="size-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {selectedImage && (
          <div className="mt-4 space-y-4 rounded-lg border bg-background p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scale</label>
              <Slider
                value={[scale]}
                onValueChange={handleScaleChange}
                min={0.1}
                max={3}
                step={0.1}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRotate('left')}
              >
                <RotateCcw className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRotate('right')}
              >
                <RotateCw className="size-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-move bg-slate-100"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
