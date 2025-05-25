import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionData, defaultQuestions, PredictionRequest, PredictionResponse } from '../../models/prediction.model';
import { PredictionService } from '../../service/prediction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { ResultsDisplayComponent } from '../results-display/results-display.component';

@Component({
  selector: 'app-sleep-questionnaire',
  templateUrl: './sleep-questionnaire.component.html',
  styleUrls: ['./sleep-questionnaire.component.scss'],
  imports: [CommonModule,FormsModule,LoadingIndicatorComponent,ResultsDisplayComponent]

})
export class SleepQuestionnaireComponent implements OnInit {
  @Output() submittedResults = new EventEmitter<PredictionResponse>();

  questions: QuestionData[] = [];
  currentQuestion: number = 0;
  loading: boolean = false;
  completed: boolean = false;
  result?: PredictionResponse;

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.questions = JSON.parse(JSON.stringify(defaultQuestions));
  }

  updateValue(value: any): void {
    this.questions[this.currentQuestion].value = value;
  }

  nextQuestion(): void {
    if (this.currentQuestion < this.questions.length - 1) {
      this.loading = true;
      
      this.predictionService.simulateLoading().subscribe(() => {
        this.currentQuestion++;
        this.loading = false;
      });
    } else {
      this.submitForm();
    }
  }

  previousQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  submitForm(): void {
    this.loading = true;
    
    const formData: PredictionRequest = {
      sleep: this.findQuestionById('sleep').value,
      screen: this.findQuestionById('screen').value,
      social: this.findQuestionById('social').value,
      exercise: this.findQuestionById('exercise').value,
      stress: this.findQuestionById('stress').value,
      diet: this.findQuestionById('diet').value
    };

    this.predictionService.predict(formData).subscribe(
      (response) => {
        this.loading = false;
        this.completed = true;
        this.result = response;
        this.submittedResults.emit(response);
      },
      (error) => {
        console.error('Error al obtener predicción:', error);
        this.loading = false;
        
        const mockResult: PredictionResponse = {
        predictions: {
        "DecisionTree": "feliz",
        "GradientBoosting": "feliz",
        "KNN": "feliz",
        "LogisticRegression": "feliz",
        "RandomForest": "feliz",
        "SVM": "feliz"
        },          
          accuracies: {
            "RandomForest": "39.8%",
            "LogisticRegression": "42.8%",
            "KNN": "37.8%",
            "DecisionTree": "33.5%",
            "GradientBoosting": "42.2%",
            "SVM": "43.5%"
          }
        };
        
        this.completed = true;
        this.result = mockResult;
        this.submittedResults.emit(mockResult);
      }
    );
  }

  resetForm(): void {
    this.questions = JSON.parse(JSON.stringify(defaultQuestions));
    this.currentQuestion = 0;
    this.completed = false;
    this.result = undefined;
  }

  private findQuestionById(id: string): QuestionData {
    return this.questions.find(q => q.id === id) || this.questions[0];
  }

  get progress(): number {
    return ((this.currentQuestion + 1) / this.questions.length) * 100;
  }
}