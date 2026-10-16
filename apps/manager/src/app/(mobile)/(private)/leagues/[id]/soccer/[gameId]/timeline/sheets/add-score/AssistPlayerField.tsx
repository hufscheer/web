'use client';

import { AddCircleIcon, CancelIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';

import { usePortalContainer } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import type { SelectOption } from '../../../../../_components/timeline/use-player-selection';

type Props = {
  visible: boolean;
  value: string | null;
  options: SelectOption[];
  disabled: boolean;
  onToggle: (visible: boolean) => void;
  onChange: (value: string) => void;
};

export function AssistPlayerField({
  visible,
  value,
  options,
  disabled,
  onToggle,
  onChange,
}: Props) {
  const container = usePortalContainer();

  if (!visible) {
    return (
      <Button
        color="black"
        variant="subtle"
        size="lg"
        className="w-full gap-2 border border-neutral-200 text-neutral-400"
        onClick={() => onToggle(true)}
      >
        <AddCircleIcon />
        어시스트 선수 추가
      </Button>
    );
  }

  return (
    <>
      <InputSelect
        label="어시스트 선수"
        value={value}
        onValueChange={(value) => {
          if (value) onChange(value);
        }}
        disabled={disabled}
        container={container}
        options={options}
      />
      <Button
        color="black"
        variant="subtle"
        size="lg"
        className="w-full gap-2 border border-neutral-200 text-neutral-400"
        onClick={() => onToggle(false)}
      >
        <CancelIcon />
        어시스트 선수 삭제
      </Button>
    </>
  );
}
