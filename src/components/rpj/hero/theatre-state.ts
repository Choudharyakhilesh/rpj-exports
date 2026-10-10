// Builds a Theatre.js project state in code so the hero's camera choreography ships
// without a hand-exported JSON. Open the site with `?studio` in dev to tweak it visually,
// then export the state from Theatre Studio and replace `buildHeroState()` with it.

type Bezier = readonly [number, number, number, number];

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  soft: [0.4, 0, 0.2, 1],
  linear: [0, 0, 1, 1],
} satisfies Record<string, Bezier>;

// [position (seconds), value, ease of the segment that starts here]
type Key = readonly [number, number, Bezier?];

type Tracks = Record<string, Record<string, Key[]>>;

/** Sequence length in seconds. 0 → INTRO_END autoplays; the rest is scrubbed by scroll. */
export const INTRO_END = 2.6;
export const SEQUENCE_END = 6;

export const HERO_TRACKS: Tracks = {
  Camera: {
    x: [[0, -2.6, EASE.out], [INTRO_END, 0, EASE.inOut], [4.2, -0.8, EASE.inOut], [SEQUENCE_END, 1.2]],
    y: [[0, 3.2, EASE.out], [INTRO_END, 0.4, EASE.inOut], [4.2, 0.1, EASE.inOut], [SEQUENCE_END, 1.4]],
    z: [[0, 16, EASE.out], [INTRO_END, 9.8, EASE.inOut], [4.2, 7.9, EASE.inOut], [SEQUENCE_END, 10.5]],
    fov: [[0, 26, EASE.out], [INTRO_END, 34, EASE.inOut], [SEQUENCE_END, 38]],
  },
  Globe: {
    spin: [[0, -1.4, EASE.out], [INTRO_END, 0, EASE.inOut], [4.2, 0.55, EASE.inOut], [SEQUENCE_END, 1.1]],
    scale: [[0, 0.55, EASE.out], [INTRO_END, 1, EASE.inOut], [4.2, 1.12, EASE.inOut], [SEQUENCE_END, 0.92]],
    offsetX: [[0, 2.6, EASE.out], [INTRO_END, 2.5, EASE.inOut], [4.2, -1.9, EASE.inOut], [SEQUENCE_END, 0]],
    offsetY: [[0, 0, EASE.out], [INTRO_END, 0, EASE.inOut], [SEQUENCE_END, -0.4]],
  },
  Atmosphere: {
    routes: [[0, 0], [1.1, 0, EASE.soft], [2.9, 1], [SEQUENCE_END, 1]],
    seeds: [[0, 0, EASE.out], [1.8, 1], [SEQUENCE_END, 1]],
    glow: [[0, 0, EASE.out], [INTRO_END, 1, EASE.inOut], [4.2, 1.35, EASE.inOut], [SEQUENCE_END, 0.8]],
  },
};

type Keyframe = {
  id: string;
  position: number;
  value: number;
  connectedRight: boolean;
  handles: [number, number, number, number];
  type: 'bezier';
};

function toKeyframes(trackId: string, keys: Key[]): Keyframe[] {
  return keys.map(([position, value, ease], i) => {
    const incoming = keys[i - 1]?.[2] ?? EASE.linear;
    const outgoing = ease ?? EASE.linear;
    return {
      id: `${trackId}-k${i}`,
      position,
      value,
      connectedRight: i < keys.length - 1,
      // Theatre reads [2],[3] as this segment's first control point and the next
      // keyframe's [0],[1] as its second one — i.e. a CSS cubic-bezier split in two.
      handles: [incoming[2], incoming[3], outgoing[0], outgoing[1]],
      type: 'bezier',
    };
  });
}

export function buildHeroState(sheetId = 'Hero') {
  const tracksByObject: Record<string, unknown> = {};

  for (const [objectKey, props] of Object.entries(HERO_TRACKS)) {
    const trackData: Record<string, unknown> = {};
    const trackIdByPropPath: Record<string, string> = {};
    for (const [prop, keys] of Object.entries(props)) {
      const trackId = `${objectKey}.${prop}`;
      trackData[trackId] = {
        type: 'BasicKeyframedTrack',
        __debugName: `${objectKey}:${prop}`,
        keyframes: toKeyframes(trackId, keys),
      };
      trackIdByPropPath[JSON.stringify([prop])] = trackId;
    }
    tracksByObject[objectKey] = { trackData, trackIdByPropPath };
  }

  return {
    sheetsById: {
      [sheetId]: {
        staticOverrides: { byObject: {} },
        sequence: {
          type: 'PositionalSequence',
          length: SEQUENCE_END,
          subUnitsPerUnit: 60,
          tracksByObject,
        },
      },
    },
    definitionVersion: '0.4.0',
    revisionHistory: [],
  };
}
