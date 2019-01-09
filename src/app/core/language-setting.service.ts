import {Injectable} from '@angular/core';

/**
 * LanguageSettingService service class
 * Stores the current language in local storage
 */
@Injectable()
export class LanguageSettingService {

  /** The key for language */
  private languageKey: string;

  constructor() {
    this.languageKey = 'CURRENT_LANGUAGE';
  }


  /**
   * Store language in local storage
   * @param { string } language - The language
   * @return { void }
   */
  public setLanguage(language: string) {
    localStorage.setItem(this.languageKey, language);
  }

  /**
   * Retrieve language from local storage
   * @param { none }
   * @return { String } - The language
   */
  public getLanguage() {
    const language: string = localStorage.getItem(this.languageKey);
    if (!language) {
      this.setLanguage('en');
      return 'en';
    }
    return language;
  }

  /**
   * Remove language from local storage
   * @param { none }
   * @return { void }
   */
  public removeLanguage() {
    localStorage.removeItem(this.languageKey);
  }


}
