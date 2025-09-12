import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/in-memory-data.service';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 👇 新增：PrimeNG 配置器
import { providePrimeNG } from 'primeng/config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        delay: 500,
        passThruUnknownUrl: true
      }),
      BrowserAnimationsModule
    ),
    // 👇 新增 PrimeNG 全局配置（主题 + 交互效果）
    providePrimeNG({
      theme: {
        preset: 'fluent', // 👈 简约现代风
        options: {
          darkModeSelector: false,
          prefix: 'p'
        }
      },
      ripple: true, // 按钮涟漪效果
      inputStyle: 'outlined', // 输入框风格
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100
      }
    }),
    ...appConfig.providers
  ],
}).catch(err => console.error(err));