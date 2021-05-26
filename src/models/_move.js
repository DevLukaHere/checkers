class _move {
  constructor(id, from, to, action, brokenPawn) {
    this.id = id || undefined;
    this.from = from || undefined;
    this.to = to || undefined;
    this.action = action || undefined;
    this.brokenPawn = brokenPawn || undefined;
  }

  get() {
    return {
      id: this.id,
      from: this.from,
      to: this.to,
      action: this.action,
      brokenPawn: this.brokenPawn,
    };
  }
}

export default _move;
