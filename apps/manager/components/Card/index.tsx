import { GameTeamType } from '@hcc/api';
import { rem } from '@hcc/styles';
import Image from 'next/image';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import * as styles from './styles.css';

type CardProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={styles.root} {...props}>
      {children}
    </div>
  );
});

const CardHead = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'div'>
>(function CardHead({ children, ...props }, ref) {
  return (
    <div ref={ref} {...props} className={styles.headContainer}>
      {children}
    </div>
  );
});

type CardContentProps = {
  marginTop?: number;
  gap?: number;
} & ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ children, marginTop = 0, gap = 0, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={styles.contentContainer}
        style={{ marginTop: rem(marginTop), gap: rem(gap) }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

type CardGameScoreProps = {
  win?: boolean;
  isPkTaken: boolean;
} & GameTeamType &
  ComponentPropsWithoutRef<'div'>;

const CardGameScore = forwardRef<HTMLDivElement, CardGameScoreProps>(
  function CardGameScore(
    {
      gameTeamId,
      gameTeamName,
      logoImageUrl,
      win = true,
      score,
      isPkTaken,
      pkScore,
      ...props
    },
    ref,
  ) {
    return (
      <div
        key={gameTeamId}
        ref={ref}
        {...props}
        className={styles.gameScoreContainer}
      >
        <span className={styles.gameTeamContainer}>
          <span className={styles.gameTeamLogo}>
            <Image
              src={logoImageUrl}
              alt={`${gameTeamName} 로고`}
              width={22}
              height={22}
              priority={true}
            />
          </span>
          <p>{gameTeamName}</p>
        </span>
        <p className={styles.gameScore({ win })}>
          {score}
          {isPkTaken && ` (${pkScore})`}
        </p>
      </div>
    );
  },
);

const CardFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function CardFooter({ children, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={styles.footerContainer}>
        {children}
      </div>
    );
  },
);

export default Object.assign(
  {},
  {
    Root: Card,
    Head: CardHead,
    Content: CardContent,
    GameScore: CardGameScore,
    Footer: CardFooter,
  },
);
