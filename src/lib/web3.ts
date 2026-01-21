import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// Constants for Zora addresses on Base
export const ZORA_1155_FACTORY = '0x777777C338d93e2C7CA1398dB95FCC886779C852'; // Verify this address
export const PAYMENT_RECEIVER = '0x980E5F15E788Cb653C77781099Fb739d7A1aEEd0';
