import { Button, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

export default function ConfirmModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title fw="bold">대회 생성 완료</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <p>대회 팀 및 대회 선수는 추후 수정할 수 있습니다.</p>
            <p>정말 완료하시겠습니까?</p>

            <Flex gap="sm" mt="lg">
              <Button fullWidth onClick={close} variant="light" color="red">
                취소
              </Button>
              <Button fullWidth component={Link} href="/" variant="filled">
                완료
              </Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open} variant="subtle">
        완료
      </Button>
    </>
  );
}
