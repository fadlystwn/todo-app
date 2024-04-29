"use client";
import React, { FC } from 'react';
import { Icon } from '@iconify-icon/react';

type CreateButtonProps = {
  onShow: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({ onShow }) => {
  return (
    <button
      onClick={onShow}
      className="ml-auto border-2 rounded w-12 h-12 border-slate-800 hover:border-emerald-500  active:border-emerald-300">
      <Icon icon="tabler:plus" className="text-3xl" />
    </button>
  );
};

export default CreateButton;