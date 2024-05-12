import { Button, ButtonProps, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import React from 'react';

type ConfirmationModalProps = {
  title?: string;
  children?: React.ReactNode;
  labels?: { confirm: string; cancel: string };
  onConfirm: any;
  onCancel?: any;
  buttonProps?: ButtonProps;
  labelButton?: string;
};

export function ConfirmationModal({
  title,
  children,
  labels,
  onConfirm,
  onCancel,
  buttonProps,
  labelButton,
}: ConfirmationModalProps) {
  const openModal = () =>
    modals.openConfirmModal({
      title: title ?? 'Please confirm your action',
      children: children ?? (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      labels: labels ?? { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: onCancel ?? modals.close,
      onConfirm,
    });

  return (
    <Button onClick={openModal} {...buttonProps}>
      {labelButton}
    </Button>
  );
}
