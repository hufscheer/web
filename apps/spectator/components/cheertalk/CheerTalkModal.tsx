import { Modal } from '@hcc/ui';

type CheerTalkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CheerTalkModal = ({ isOpen, onClose }: CheerTalkModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Modal Content</div>
    </Modal>
  );
};

export default CheerTalkModal;
