import { ButtonColorSchemeType } from '@hcc/ui';

export type CheerTalkFeatureKeys =
  | 'allHideFeature'
  | 'reportedHideFeature'
  | 'blockedUnhideFeature';

export type CheerTalkConfigType = {
  [key in CheerTalkFeatureKeys]: {
    buttonText: string;
    buttonColorScheme: ButtonColorSchemeType;
    toastMessage: string;
    showDialog: boolean;
  };
};
