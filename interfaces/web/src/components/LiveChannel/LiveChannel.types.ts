export enum LiveChannelStep {
  Intro = 'intro',
  Chat = 'chat',
}

export interface LiveChannelState {
  step: LiveChannelStep;
  visitorName: string;
  visitorCompany: string;
  inputValue: string;
  wasConnected: boolean;
}

export const initialLiveChannelState: LiveChannelState = {
  step: LiveChannelStep.Intro,
  visitorName: '',
  visitorCompany: '',
  inputValue: '',
  wasConnected: false,
};
