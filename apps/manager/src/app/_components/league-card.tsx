import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Button, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';

export const LeagueCard = () => {
  return (
    <div className="column bg-white p-5">
      <div className="row-between">
        <Badge size="sm" variant="danger">
          전반 &middot; 00:00
        </Badge>
        <Typography className="center-y" color="var(--color-neutral-500)" fontSize={14} asChild>
          <Link href={''}>
            2024.07.08. (목) 14:00
            <ChevronForwardIcon size={20} />
          </Link>
        </Typography>
      </div>

      <div className="column mt-4 gap-2">
        <div className="row-between">
          <div className="center-y flex-1 gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image src="/static/heambugi.png" alt="햄부기팀" priority={false} fill />
            </div>
            <Typography fontSize={14} weight="medium">
              경영 바바예투
            </Typography>
          </div>
          <Typography className="shrink-0" fontSize={14} weight="medium">
            0
          </Typography>
        </div>

        <div className="row-between">
          <div className="center-y flex-1 gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image src="/static/heambugi2.jpg" alt="햄부기팀팀" priority={false} fill />
            </div>
            <Typography fontSize={14} weight="medium">
              쌀먹고
            </Typography>
          </div>
          <Typography className="shrink-0" fontSize={14} weight="medium">
            0
          </Typography>
        </div>
      </div>

      <div className="row-between mt-4 gap-2.5">
        <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
          <Link href={''}>경기 진행</Link>
        </Button>
        <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
          <Link href={''}>경기 정보 수정</Link>
        </Button>
      </div>
    </div>
  );
};
