'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { GameUpdateFormType } from '~/api';
import type { Game } from '~/desktop/types';

import { useDeleteGames, useUpdateGames } from '~/api';
import { DeleteOutlineIcon } from '~/desktop/components/icons';
import { Button } from '~/desktop/components/ui/button';
import { ConfirmDialog } from '~/desktop/components/ui/confirm-dialog';
import { DateTimeInput } from '~/desktop/components/ui/date-time-input';
import { ErrorText, Field, FormCard, SelectInput, TextInput } from '~/desktop/components/ui/field';
import { Toasts, useToasts } from '~/desktop/components/ui/toast';
import { routes } from '~/desktop/constants/routes';
import { roundLabel, roundsUpTo } from '~/desktop/constants/sports';
import { parseHTTPError } from '~/desktop/utils/http-error';

type Props = {
  game: Game;
  quarter: GameUpdateFormType['quarter'];
  maxRound: number;
  thirdPlaceAvailable: boolean;
};

export const GameEditForm = ({ game, quarter, maxRound, thirdPlaceAvailable }: Props) => {
  const router = useRouter();
  const { toasts, push, pushError } = useToasts();
  const { mutateAsync: updateGame } = useUpdateGames();
  const { mutateAsync: deleteGame } = useDeleteGames();

  const [name, setName] = useState(game.gameName);
  const [round, setRound] = useState(game.round);
  const [thirdPlace, setThirdPlace] = useState(game.thirdPlaceMatch);
  // DateTimeInput 은 초를 뺀 'YYYY-MM-DDTHH:mm' 형태를 쓴다
  const [startTime, setStartTime] = useState(game.startTime.slice(0, 16));
  const [videoId, setVideoId] = useState(game.videoId);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const rounds = roundsUpTo(maxRound);
  // 3·4위전은 준결승에서 진 두 팀의 경기라 결승과 같은 자리에 놓인다
  const canBeThirdPlace = thirdPlaceAvailable && round === 2;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);
    try {
      // quarter·state 는 서버의 수정 DTO 에 없어 무시된다. 요청 타입이 요구해서 현재 값을 보낸다
      await updateGame({
        leagueId: game.leagueId,
        gameId: game.gameId,
        name: name.trim(),
        round,
        quarter,
        state: game.state,
        startTime: `${startTime}:00`,
        videoId: videoId.trim(),
        thirdPlaceMatch: canBeThirdPlace && thirdPlace,
      });
      push('경기 정보가 수정되었어요');
      router.push(routes.league(game.leagueId));
    } catch (e) {
      setError(await parseHTTPError(e, '경기를 수정하지 못했어요.'));
      setPending(false);
    }
  };

  const remove = async () => {
    setPending(true);
    try {
      await deleteGame({ leagueId: game.leagueId, gameId: game.gameId });
      router.push(routes.league(game.leagueId));
    } catch (e) {
      pushError(await parseHTTPError(e, '경기를 삭제하지 못했어요.'));
      setPending(false);
      setConfirming(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex max-w-[1180px] flex-col gap-5">
      <div className="flex flex-wrap items-start gap-6">
        <FormCard title="경기 정보" className="w-[560px] shrink-0">
          <Field label="경기명">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 4강 1경기"
            />
          </Field>

          <Field label="라운드">
            <div className="flex flex-col gap-2">
              <SelectInput value={round} onChange={(e) => setRound(Number(e.target.value))}>
                {rounds.map((r) => (
                  <option key={r} value={r}>
                    {roundLabel(r)}
                  </option>
                ))}
              </SelectInput>

              {canBeThirdPlace && (
                <label className="flex w-fit cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={thirdPlace}
                    onChange={(e) => setThirdPlace(e.target.checked)}
                    className="size-4.5"
                  />
                  <span className="text-t6">3·4위전</span>
                </label>
              )}
            </div>
          </Field>

          <Field label="시작 일시">
            <DateTimeInput value={startTime} onChange={setStartTime} required />
          </Field>

          <Field label="경기 영상" hint="유튜브 영상 ID만 넣어 주세요.">
            <TextInput
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="예) dQw4w9WgXcQ"
            />
          </Field>
        </FormCard>

        <FormCard title="현재 상태" className="min-w-0 flex-1">
          <Field label="대진">
            <span className="text-t6 font-semibold">
              {game.gameTeams[0].gameTeamName} vs {game.gameTeams[1].gameTeamName}
            </span>
          </Field>
          <Field label="점수">
            <span className="tnum text-t4 font-bold">
              {game.gameTeams[0].score} : {game.gameTeams[1].score}
            </span>
          </Field>
          <Field label="진행">
            <span className="text-t6 font-semibold">
              {game.state === 'PLAYING'
                ? `진행 중 · ${game.gameQuarter.label}`
                : game.state === 'FINISHED'
                  ? '종료'
                  : '예정'}
            </span>
          </Field>
        </FormCard>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex items-center justify-between gap-2">
        <Button
          size="md"
          color="danger"
          variant="outline"
          disabled={pending}
          onClick={() => setConfirming(true)}
        >
          <DeleteOutlineIcon size={16} />
          경기 삭제
        </Button>

        <div className="flex gap-2">
          <Button size="md" color="black" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" size="md" disabled={pending || !startTime}>
            {pending ? '저장 중…' : '완료'}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirming}
        title="이 경기를 삭제할까요?"
        description={'라인업과 기록이 함께 사라져요.\n되돌릴 수 없어요.'}
        pending={pending}
        onConfirm={remove}
        onClose={() => setConfirming(false)}
      />
      <Toasts items={toasts} />
    </form>
  );
};
