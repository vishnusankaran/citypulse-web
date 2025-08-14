import React from 'react';
import { Toggle } from '@/components/ui/toggle';

// A reusable component that acts as a radio group using shadcn/ui's Toggle.
// It takes options, a current value, and a change handler as props.
export const ToggleRadioGroup = ({ options, value, onValueChange }) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value || options[0].value
  );

  return (
    <div className="flex gap-0">
      {options.map((option, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === options.length - 1;

        return (
          <Toggle
            key={option.value}
            pressed={selectedValue === option.value}
            onPressedChange={() => {
              setSelectedValue(option.value);
              onValueChange(option.value);
            }}
            variant="outline"
            aria-label={option.label}
            className={`cursor-pointer rounded-none ${
              selectedValue !== option.value ? 'bg-white' : ''
            } ${
              isFirst
                ? 'rounded-l-md'
                : isLast
                ? 'rounded-r-md'
                : 'rounded-none'
            }`}
          >
            {option.label}
          </Toggle>
        );
      })}
    </div>
  );
};
