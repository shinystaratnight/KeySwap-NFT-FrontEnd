import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface UserDropDownProps {
  userName: string;
  userAvatar: any;
  balance: string;
  walletAddress?: string;
}

export interface ButtonProps {
  label: string;
  img?: string;
  variant: 'primary' | 'outline-primary' | 'dark';
  isLoading?: boolean;
  type?: string;
  className?: string;
  loadingMessage?: string;
  onClick?: () => void;
}

export interface ToggleButtonProps {
  activeImg?: string;
  defaultImg?: string;
  active: boolean;
  onClick?: (isActive: boolean) => void;
}

export interface ProfileImageProps {
  img?: string;
  verified?: boolean;
  edit?: boolean;
  onChange?: Function;
}

export interface FileInputProps {
  info?: string;
  label: string;
  dispalyImage?: boolean;
  defaultImage?: string;
  onChange?: Function;
}

export interface CreatorCard2Props {
  image: string;
  userIcon: string;
  userName: string;
  subTitle: string;
  previewList: [string, string, string];
  onClick?: () => void;
}

export interface CreatorObj {
  image: string;
  userIcon: string;
  userName: string;
  subTitle: string;
  previewList: [string, string, string];
}
export interface CreatorObj2 {
  title: string;
  titleInfo: string;
  userName: string;
  price: string;
  image: string;
  userIcon: string;
}

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  postfix?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues> | null;
  onChange?: (data: any) => void;
  type?: 'text' | 'number' | 'password';
  value?: string;
}

export interface HomeCardProps {
  image: string;
  ownerName: string;
  userAvatarUrl: string;
}
