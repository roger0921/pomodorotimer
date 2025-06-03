class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.currentTime = this.workTime;
        this.isWorking = true;
        this.isRunning = false;
        this.timer = null;

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.statusElement = document.querySelector('.status');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.timer);
    }

    reset() {
        this.stop();
        this.currentTime = this.isWorking ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    tick() {
        if (this.currentTime <= 0) {
            this.isWorking = !this.isWorking;
            this.currentTime = this.isWorking ? this.workTime : this.breakTime;
            this.statusElement.textContent = this.isWorking ? '作業中' : '休憩中';
            this.stop();
            return;
        }

        this.currentTime--;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerElement.textContent = `
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}
        `;
    }
}

// タイマーの初期化
const pomodoroTimer = new PomodoroTimer();
