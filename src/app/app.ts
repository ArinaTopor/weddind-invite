import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './styles/app.scss',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('wedding-project');

  countdownDays = '00';
  countdownHours = '00';
  countdownMinutes = '00';
  countdownSeconds = '00';

  private readonly weddingDate = new Date('2026-07-11T14:00:00+03:00').getTime();
  private countdownIntervalId: number | null = null;

  ngOnInit(): void {
    this.updateCountdown();
    this.countdownIntervalId = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownIntervalId !== null) {
      window.clearInterval(this.countdownIntervalId);
    }
  }

  private updateCountdown(): void {
    const now = Date.now();
    const distance = this.weddingDate - now;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (distance > 0) {
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((distance / (1000 * 60)) % 60);
      seconds = Math.floor((distance / 1000) % 60);
    }

    this.countdownDays = this.padNumber(days);
    this.countdownHours = this.padNumber(hours);
    this.countdownMinutes = this.padNumber(minutes);
    this.countdownSeconds = this.padNumber(seconds);
  }

  private padNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
