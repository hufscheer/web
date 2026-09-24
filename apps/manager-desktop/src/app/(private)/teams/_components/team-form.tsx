'use client';

import type { TeamUnitType } from '@hcc/manager-api';

import { useCreateTeams, useDeleteTeamLogo, useUpdateTeams } from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import type { SportType } from '~/types';

import { CheckSmallIcon, CloseIcon, HCCBigLogo } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { ErrorText, Field, FormCard, SelectInput, TextInput } from '~/components/ui/field';
import { Toasts, useToasts } from '~/components/ui/toast';
import { routes } from '~/constants/routes';
import { ACCEPTED_IMAGE_TYPES, useImageUpload } from '~/hooks/useImageUpload';
import { parseHTTPError } from '~/utils/http-error';

import { PlayerPicker, type PickedPlayer } from './player-picker';
import { RosterAssistant } from './roster-assistant';

/** 모바일 매니저와 같은 팔레트 */
const COLOR_PALETTE = ['#FF9A9E', '#FFA788', '#FFD479', '#8CBAFF', '#7EECD8', '#99A8CC', '#B8C0CC'];

export type RosterEntry = PickedPlayer & { jerseyNumber: number };

type Props = {
  sportType: SportType;
  units: TeamUnitType[];
  teamId?: number;
  initial?: {
    name: string;
    unit: string;
    teamColor: string;
    logoImageUrl: string;
    teamPlayers: RosterEntry[];
  };
};

export const TeamForm = ({ sportType, units, teamId, initial }: Props) => {
  const router = useRouter();
  const { toasts, push, pushError } = useToasts();
  const fileRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name ?? '');
  const [unit, setUnit] = useState(initial?.unit ?? '');
  const [teamColor, setTeamColor] = useState(initial?.teamColor ?? COLOR_PALETTE[0]);
  const [logoImageUrl, setLogoImageUrl] = useState(initial?.logoImageUrl ?? '');
  const [roster, setRoster] = useState<RosterEntry[]>(initial?.teamPlayers ?? []);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const { uploadImage } = useImageUpload();
  const { mutateAsync: createTeam } = useCreateTeams();
  const { mutateAsync: updateTeam } = useUpdateTeams();
  const { mutateAsync: deleteTeamLogo } = useDeleteTeamLogo();

  const isEdit = teamId !== undefined;
  const invalid = !name.trim() || !unit.trim() || !teamColor || (!isEdit && !logoImageUrl);
  const isCustomColor = Boolean(teamColor) && !COLOR_PALETTE.includes(teamColor);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      setLogoImageUrl(await uploadImage(file));
    } catch (e) {
      pushError(await parseHTTPError(e, '이미지를 올리지 못했어요.'));
    } finally {
      setUploading(false);
    }
  };

  // 저장된 팀의 로고는 전용 엔드포인트로 지운다. 빈 문자열로 수정하면 서버가 400 을 준다
  const removeLogo = async () => {
    if (!isEdit) return setLogoImageUrl('');
    try {
      await deleteTeamLogo({ id: teamId });
      setLogoImageUrl('');
      push('로고를 삭제했어요');
    } catch (e) {
      pushError(await parseHTTPError(e, '로고를 삭제하지 못했어요.'));
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || invalid) return;

    setPending(true);
    setError(null);
    try {
      const input = {
        name: name.trim(),
        unit,
        teamColor,
        teamPlayers: roster.map((p) => ({ playerId: p.playerId, jerseyNumber: p.jerseyNumber })),
      };

      // 수정에서 로고를 안 바꿨으면 null 을 보낸다. 서버는 null 을 "그대로 둠"으로 읽는다
      const changedLogo =
        logoImageUrl && logoImageUrl !== initial?.logoImageUrl ? logoImageUrl : null;
      if (isEdit) await updateTeam({ id: teamId, ...input, sportType, logoImageUrl: changedLogo });
      else await createTeam({ ...input, logoImageUrl, sportType });

      push(isEdit ? '팀이 수정되었어요' : '팀이 생성되었어요');
      router.push(routes.teams(sportType));
    } catch (e) {
      setError(await parseHTTPError(e, '요청을 처리하지 못했어요.'));
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex max-w-[1260px] flex-col gap-5">
      <div className="flex flex-wrap items-start gap-6">
        <FormCard title="팀 정보" className="w-[480px] shrink-0">
          <Field
            label="로고"
            hint="정사각형 이미지가 가장 잘 보여요. 5MB 까지. 팀 생성에는 로고가 필요해요."
          >
            <div className="flex items-center gap-3">
              <span
                className="size-16 shrink-0 overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-greyscale-25)] bg-cover bg-center"
                style={logoImageUrl ? { backgroundImage: `url("${logoImageUrl}")` } : undefined}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="xs"
                  color="black"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  {uploading ? '올리는 중…' : '이미지 선택'}
                </Button>
                {logoImageUrl && (
                  <Button
                    type="button"
                    size="xs"
                    color="danger"
                    variant="outline"
                    onClick={() => void removeLogo()}
                  >
                    삭제
                  </Button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void upload(file);
                  e.target.value = '';
                }}
              />
            </div>
          </Field>

          <Field label="팀 이름">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 컴퓨터공학부"
              required
            />
          </Field>

          <Field label="소속">
            <SelectInput value={unit} onChange={(e) => setUnit(e.target.value)} required>
              <option value="" disabled>
                소속을 선택하세요
              </option>
              {units.map((u) => (
                <option key={u.id} value={u.unitName}>
                  {u.unitName}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field label="팀 색상" hint="경기 화면에서 팀을 구분하는 색이에요.">
            <div className="grid grid-cols-8 gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`색상 ${color}`}
                  aria-pressed={teamColor === color}
                  onClick={() => setTeamColor(color)}
                  className={[
                    'flex aspect-square w-full items-center justify-center rounded-[var(--radius-control)] transition-shadow',
                    teamColor === color ? 'ring-2 ring-black/60' : '',
                  ].join(' ')}
                  style={{ backgroundColor: color }}
                >
                  {teamColor === color && <CheckSmallIcon size={24} className="text-black/60" />}
                </button>
              ))}

              <button
                type="button"
                aria-label="직접 고르기"
                onClick={() => colorRef.current?.click()}
                className={[
                  'flex aspect-square w-full items-center justify-center rounded-[var(--radius-control)] border text-t7 font-bold',
                  isCustomColor
                    ? 'border-transparent ring-2 ring-black/60'
                    : 'border-[var(--color-neutral-300)] bg-[var(--color-canvas)] text-[var(--color-neutral-400)]',
                ].join(' ')}
                style={isCustomColor ? { backgroundColor: teamColor } : undefined}
              >
                {isCustomColor ? <CheckSmallIcon size={24} className="text-black/60" /> : '+'}
              </button>
              <input
                ref={colorRef}
                type="color"
                value={teamColor || '#000000'}
                onChange={(e) => setTeamColor(e.target.value)}
                className="invisible size-0"
              />
            </div>
          </Field>
        </FormCard>

        <FormCard
          title={`선수 ${roster.length}명`}
          className="min-w-0 flex-1"
          actions={
            !isEdit && (
              <Button
                type="button"
                size="xs"
                color="black"
                variant="outline"
                disabled={invalid}
                title={invalid ? '팀 정보를 먼저 채워 주세요' : undefined}
                onClick={() => setAssistantOpen(true)}
              >
                <HCCBigLogo className="h-3.5 w-auto" />
                어시스턴트로 등록
              </Button>
            )
          }
        >
          <div className="border-b border-[var(--color-greyscale-50)] px-6 py-4">
            <PlayerPicker
              excludeIds={roster.map((p) => p.playerId)}
              onPick={(player) => setRoster((prev) => [...prev, { ...player, jerseyNumber: 0 }])}
            />
          </div>

          {roster.length === 0 ? (
            <p className="text-t6 px-6 py-12 text-center text-[var(--color-neutral-400)]">
              검색해서 선수를 추가해 주세요.
            </p>
          ) : (
            <div className="overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-[var(--color-canvas)]">
                  <tr className="text-t7 border-b border-[var(--color-greyscale-50)] text-[var(--color-neutral-500)]">
                    <th className="px-6 py-2.5 text-left font-semibold">이름</th>
                    <th className="px-3 py-2.5 text-left font-semibold">학번</th>
                    <th className="w-28 px-3 py-2.5 text-left font-semibold">등번호</th>
                    <th className="w-14 px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {roster.map((player, index) => (
                    <tr
                      key={player.playerId}
                      className="border-b border-[var(--color-hairline)] last:border-b-0"
                    >
                      <td className="text-t6 px-6 py-2 font-medium">{player.name}</td>
                      <td className="tnum text-t6 px-3 py-2 text-[var(--color-neutral-500)]">
                        {player.studentNumber}
                      </td>
                      <td className="px-3 py-2">
                        <TextInput
                          type="number"
                          min={0}
                          aria-label={`${player.name} 등번호`}
                          value={player.jerseyNumber}
                          onChange={(e) =>
                            setRoster((prev) =>
                              prev.map((p, i) =>
                                i === index
                                  ? { ...p, jerseyNumber: Number(e.target.value) || 0 }
                                  : p,
                              ),
                            )
                          }
                          className="tnum h-9 w-20 px-2.5"
                        />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          aria-label={`${player.name} 제외`}
                          onClick={() => setRoster((prev) => prev.filter((_, i) => i !== index))}
                          className="text-[var(--color-neutral-400)] hover:text-[var(--color-danger-600)]"
                        >
                          <CloseIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </FormCard>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          size="md"
          color="black"
          variant="outline"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button type="submit" size="md" disabled={pending || invalid}>
          {pending ? '저장 중…' : '완료'}
        </Button>
      </div>

      <Toasts items={toasts} />

      {assistantOpen && (
        <RosterAssistant
          target={{
            kind: 'new-team',
            team: { name: name.trim(), logoImageUrl, unit, teamColor, sportType },
          }}
          onClose={() => setAssistantOpen(false)}
        />
      )}
    </form>
  );
};
