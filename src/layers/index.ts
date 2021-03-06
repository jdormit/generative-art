export interface Layer {
    title: string;
    render: (rng: seedrandom.prng, canvas: CanvasRenderingContext2D) => void;
}

export * from './autumn';
export * from './lines';
