import { toast } from '@hcc/ui';
import type { ReactNode } from 'react';
import { useDeleteTeams } from '~/api';
import { AlertDialog } from '~/components/ui';

type Props = {
  id: number;
  children: ReactNode;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettle?: () => void;
};

export const TeamDeleteDialog = ({ id, children, onSuccess, onError, onSettle }: Props) => {
  const { mutateAsync } = useDeleteTeams();

  const handleTeamDelete = async (): Promise<void> => {
    try {
      await mutateAsync({ id });
      toast.success('팀이 삭제되었어요.');
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('팀 삭제에 실패했어요.');
      onError?.(error);
    } finally {
      onSettle?.();
    }
  };

  return (
    <AlertDialog
      title="삭제한 팀은 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryTitle="삭제"
      onPrimaryClick={handleTeamDelete}
    >
      {children}
    </AlertDialog>
  );
};
