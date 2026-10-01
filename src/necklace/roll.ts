/** How often the dice tries for a necklace with an even number of each kind before it takes any. */
const TRIES = 1000;

/** The number of jewels of the second kind: the configuration's binary ones. */
function ones(configuration: number): number {
  let count = 0;
  for (let rest = configuration; rest > 0; rest = Math.floor(rest / 2)) {
    count += rest % 2;
  }
  return count;
}

/**
 * A random configuration of `jewels` jewels for the dice: both kinds present,
 * not `current`, and with an even number of each kind when the jewels allow it,
 * so that even a split of whole jewels can be fair. Undefined below two jewels,
 * where no necklace has both kinds. `random` gives numbers in [0, 1), like Math.random.
 */
function rollConfiguration(jewels: number, current: number, random: () => number = Math.random): number | undefined {
  if (jewels < 2) {
    return undefined;
  }
  // 1 to 2^jewels - 2: neither all jewels of the first kind (0) nor all of the second.
  const roll = () => 1 + Math.floor(random() * (2 ** jewels - 2));
  for (let i = 0; i < TRIES; i++) {
    const configuration = roll();
    if (configuration !== current && (jewels % 2 === 1 || ones(configuration) % 2 === 0)) {
      return configuration;
    }
  }
  // Two jewels have no even mix (one of each); a random source stuck on one value never leaves it.
  const configuration = roll();
  return configuration !== current ? configuration : configuration === 1 ? 2 : configuration - 1;
}

export { rollConfiguration };
