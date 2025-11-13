export class ValidationServiceList {
  
  static validateThought(content: string, author: string): Map<string, string> {
    const validationErrors = new Map<string, string>();

    if (!content?.trim()) {
      validationErrors.set("content", "Content must not be empty");
    }
    
    if (content.trim().length > 500) {
      validationErrors.set("content", "Content must be 500 characters or less");
    }
    
    if (!author?.trim()) {
      validationErrors.set("author", "Author must be defined");
    }

    return validationErrors;
  }

  static isValid(validationErrors: Map<string, string>): boolean {
    return validationErrors.size === 0;
  }

  static getFirstError(validationErrors: Map<string, string>): string | null {
    const firstEntry = validationErrors.entries().next();
    return firstEntry.done ? null : firstEntry.value[1];
  }

  static sanitizeInput(input: string): string {
    return input.trim();
  }
}