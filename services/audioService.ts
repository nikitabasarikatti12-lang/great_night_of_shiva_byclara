class AudioService {
  private context: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.context;
  }

  public resumeContext() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  public playDamru() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // A damru rattle consists of two distinct tones hitting rapidly
    // We simulate this with a rapid sequence of percussion hits

    const numberOfHits = 8;
    const speed = 0.06; // Seconds between hits

    for (let i = 0; i < numberOfHits; i++) {
      this.playDrumHit(now + i * speed, i % 2 === 0 ? 1 : 0.9);
    }
  }

  private playDrumHit(time: number, pitchMod: number) {
    const ctx = this.getContext();
    
    // Oscillator for the "thud"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // Damru is high pitched, small drum
    osc.frequency.setValueAtTime(200 * pitchMod, time); 
    osc.frequency.exponentialRampToValueAtTime(100 * pitchMod, time + 0.1);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.2);

    // Noise for the "beads" striking
    const bufferSize = ctx.sampleRate * 0.1; // 0.1 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    
    // Bandpass filter to make it sound like beads on skin
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;

    noiseGain.gain.setValueAtTime(0.2, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(time);
  }

  public playOm() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(136.1, now); // Om frequency (C# approx)

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 1);
    gain.gain.linearRampToValueAtTime(0, now + 6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 6);
  }
}

export const audioService = new AudioService();