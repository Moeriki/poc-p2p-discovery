import Peer from 'simple-peer';

export function detectNetwork({ wrtc = undefined } = {}) {
  const peer = new Peer({ initiator: true, wrtc });
  return new Promise((resolve, reject) => {
    let external;
    let internal;
    peer.on('error', reject);
    peer.on('signal', (signal) => {
      if (signal.candidate) {
        const { groups } = signal.candidate.candidate.match(
          /\b(?<ip>\d+\.\d+\.\d+\.\d+) \d+ typ (?<type>host|srflx)/,
        );
        if (groups.type === 'host') {
          internal = groups.ip;
        }
        if (groups.type === 'srflx') {
          external = groups.ip;
        }
        if (external && internal) {
          resolve({ external, internal });
          peer.destroy();
        }
      }
    });
  });
}
