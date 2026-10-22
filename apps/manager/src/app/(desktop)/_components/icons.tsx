import type { ComponentProps, ComponentType } from 'react';

import {
  BasketballIcon as BaseBasketballIcon,
  CaptainIcon as BaseCaptainIcon,
  FoulIcon as BaseFoulIcon,
  SearchIcon as BaseSearchIcon,
  TradeIcon as BaseTradeIcon,
} from '@hcc/icons';

import { cn } from '~/utils/cn';

export * from '@hcc/icons';

type IconProps = ComponentProps<typeof BaseSearchIcon>;

// 패키지 아이콘 몇 개는 모바일 디자인대로 색이 박혀 있다. 데스크탑은 전부 글자 색을 따른다
const followTextColor = (Icon: ComponentType<IconProps>, fix: string, displayName: string) => {
  const Wrapped = ({ className, ...props }: IconProps) => (
    <Icon {...props} className={cn(fix, className)} />
  );
  Wrapped.displayName = displayName;
  return Wrapped;
};

export const BasketballIcon = followTextColor(
  BaseBasketballIcon,
  '[&_path]:fill-current',
  'BasketballIcon',
);
export const FoulIcon = followTextColor(BaseFoulIcon, '[&_path]:fill-current', 'FoulIcon');
export const SearchIcon = followTextColor(BaseSearchIcon, '[&_path]:fill-current', 'SearchIcon');
export const TradeIcon = followTextColor(BaseTradeIcon, '[&_path]:fill-current', 'TradeIcon');
// 사각형까지 같은 색이라 글자가 묻힌다. C 만 남긴다
export const CaptainIcon = followTextColor(BaseCaptainIcon, '[&_rect]:hidden', 'CaptainIcon');
