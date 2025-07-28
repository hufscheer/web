import { Button } from '@hcc/ui';
import { useState } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { LeagueFormSchema } from './types';
import LeagueInfo from '../LeagueInfo';
import * as styles2 from './styles.css';
import LeagueLineup from '../LeagueLineup';
import LeagueTeams from '../LeagueTeams';
import LeagueVideo from '../LeagueVideo';
import ProgressBar from '../progressbar';

type LeagueFormProps = {
  methods: UseFormReturn<LeagueFormSchema>;
  submitText: string;
  onSubmit: SubmitHandler<LeagueFormSchema>;
};

export const LeagueForm = ({ methods, submitText, onSubmit }: LeagueFormProps) => {
  const { watch } = methods;

  const leagueName = watch('leagueName');
  const round = watch('round');
  const quarter = watch('quarter');
  const status = watch('status');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const [videoUrl, setVideoUrl] = useState('');

  const [selectedTeams, setSelectedTeams] = useState<string[]>(['', '']);

  const [step1Active, setStep1Active] = useState(false);
  const [step2Active, setStep2Active] = useState(false);
  const [step3Active, setStep3Active] = useState(false);

  const [manualStep, setManualStep] = useState<number | null>(null);

  const step1Completed =
    !!leagueName && !!round && !!quarter && !!status && !!startDate && !!endDate; // 경기 정보만 완료되면 됨
  const step2Completed = selectedTeams.length >= 2 && selectedTeams.every((team) => !!team); // 팀 선택 완료
  const step3Completed = !!videoUrl;

  const getCurrentStep = () => {
    if (manualStep !== null) {
      return manualStep;
    }

    if (!step1Completed) return 1;
    if (!step2Completed) return 2;
    return 3;
  };

  const currentStep = getCurrentStep();

  const handleStepClick = (step: number) => {
    setManualStep(step);
  };

  // 이전 단계로 이동
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setManualStep(currentStep - 1);
    }
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep < 3) {
      setManualStep(currentStep + 1);
    }
  };

  const handleStep1Focus = () => setStep1Active(true);
  const handleStep1Blur = () => setStep1Active(false);
  const handleStep1Click = () => setStep1Active(true);

  const handleStep2Focus = () => setStep2Active(true);
  const handleStep2Blur = () => setStep2Active(false);
  const handleStep2Click = () => setStep2Active(true);

  const handleStep3Focus = () => setStep3Active(true);
  const handleStep3Blur = () => setStep3Active(false);
  const handleStep3Click = () => setStep3Active(true);

  const handleTeamChange = (index: number, value: string) => {
    const newTeams = [...selectedTeams];
    newTeams[index] = value;
    setSelectedTeams(newTeams);
  };

  const handleLineupEdit = (index: number) => {
    console.warn(`라인업 편집: 팀 ${index + 1}`);
  };

  const renderCurrentStep = () => {
    if (currentStep === 1) {
      return (
        <>
          <LeagueInfo
            methods={methods}
            onSubmit={onSubmit}
            submitText={submitText}
            onStep1Click={handleStep1Click}
            onStep1Focus={handleStep1Focus}
            onStep1Blur={handleStep1Blur}
          />
          <LeagueTeams
            teamOptions={[]}
            onTeamChange={handleTeamChange}
            onLineupEdit={handleLineupEdit}
            selectedTeams={selectedTeams}
            onStep2Click={handleStep2Click}
            onStep2Focus={handleStep2Focus}
            onStep2Blur={handleStep2Blur}
            selectedTeamsState={selectedTeams}
            setSelectedTeamsState={setSelectedTeams}
          />
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <LeagueLineup
          teamOptions={[]}
          onTeamChange={handleTeamChange}
          onLineupEdit={handleLineupEdit}
          selectedTeams={selectedTeams}
          onStep2Click={handleStep2Click}
          onStep2Focus={handleStep2Focus}
          onStep2Blur={handleStep2Blur}
          selectedTeamsState={selectedTeams}
          setSelectedTeamsState={setSelectedTeams}
        />
      );
    }

    return (
      <LeagueVideo
        methods={methods}
        onSubmit={onSubmit}
        submitText={submitText}
        onStep3Focus={handleStep3Focus}
        onStep3Blur={handleStep3Blur}
        onStep3Click={handleStep3Click}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
      />
    );
  };

  return (
    <div className={styles2.scrollArea}>
      <form className={styles2.form}>
        <div className={styles2.progressBar}>
          <ProgressBar
            currentStep={currentStep}
            step1Completed={step1Completed}
            step2Completed={step2Completed}
            step3Completed={step3Completed}
            step1Active={step1Active}
            step2Active={step2Active}
            step3Active={step3Active}
            onStepClick={handleStepClick}
          />
        </div>
        {renderCurrentStep()}
      </form>
      <div className={styles2.buttonContainer2}>
        <Button
          className={styles2.subButton}
          fullWidth
          disabled={currentStep === 1}
          onClick={handlePreviousStep}
        >
          이전 단계
        </Button>
        <Button
          className={styles2.subButton}
          fullWidth
          disabled={currentStep === 3}
          onClick={handleNextStep}
        >
          다음 단계
        </Button>
      </div>
      <div className={styles2.buttonContainer}>
        <Button
          className={styles2.button}
          type="submit"
          fullWidth
          disabled={!methods.formState.isValid}
        >
          경기 생성
        </Button>
      </div>
    </div>
  );
};
