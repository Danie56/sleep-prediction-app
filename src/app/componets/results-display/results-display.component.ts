import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionResponse } from '../../models/prediction.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss'],
  imports: [CommonModule]
})
export class ResultsDisplayComponent implements OnInit, AfterViewInit {
  @Input() results!: PredictionResponse;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('radarChart') radarChart!: ElementRef;
  
  chart1: any;
  chart2: any;

  constructor() {}

  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.results && this.barChart && this.radarChart) {
        this.createBarChart();
        this.createRadarChart();
      }
    }, 300);
  }
  
  getAlgorithms(): string[] {
    if (!this.results || !this.results.accuracies) return [];
    return Object.keys(this.results.accuracies);
  }
  
  private createBarChart(): void {
    const accuracies = this.results.accuracies;
    const ctx = this.barChart.nativeElement.getContext('2d');
    
    const labels = Object.keys(accuracies);
    const data = labels.map(key => 
      parseFloat(accuracies[key as keyof typeof accuracies].replace('%', ''))
    );
    
    this.chart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precisión (%)',
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Precisión por Algoritmo',
            font: {
              size: 18
            }
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Precisión: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: 'Precisión (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Algoritmos'
            }
          }
        }
      }
    });
  }
  
  private createRadarChart(): void {
    const accuracies = this.results.accuracies;
    const ctx = this.radarChart.nativeElement.getContext('2d');
    
    const labels = Object.keys(accuracies);
    const data = labels.map(key => 
      parseFloat(accuracies[key as keyof typeof accuracies].replace('%', ''))
    );
    
    this.chart2 = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precisión (%)',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparación de Modelos',
            font: {
              size: 18
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 30,
            max: 50,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    });
  }
}