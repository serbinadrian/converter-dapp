const progress = {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  COMPLETE: 'COMPLETE',
  ERROR: 'ERROR'
};

export const conversionStatuses = {
  PROCESSING: 'PROCESSING',
  USER_INITIATED: 'USER_INITIATED',
  COMPLETE: 'WAITING_FOR_CLAIM',
  IDLE: 'IDLE'
};

export const availableBlockchains = {
  CARDANO: 'CARDANO',
  ETHEREUM: 'ETHEREUM'
};

export const externalLinks = {
  TERMS_AND_CONDITIONS: 'https://public.singularitynet.io/terms_and_conditions.html'
};

export const conversionSteps = {
  DEPOSIT_TOKENS: 0,
  BURN_TOKENS: 1,
  CLAIM_TOKENS: 2,
  SUMMARY: 3
};

export const conversionStepsForAdaToEth = [
  {
    label: 'Deposit Tokens',
    step: conversionSteps.DEPOSIT_TOKENS,
    progress: progress.IDLE
  },
  {
    label: 'Burn Tokens',
    step: conversionSteps.BURN_TOKENS,
    progress: progress.IDLE
  },
  {
    label: 'Claim Tokens',
    step: conversionSteps.CLAIM_TOKENS,
    progress: progress.IDLE
  },
  {
    label: 'Summary',
    step: conversionSteps.SUMMARY,
    progress: progress.IDLE
  }
];
