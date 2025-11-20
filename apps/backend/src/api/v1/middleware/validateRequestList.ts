import { Request, Response, NextFunction } from 'express';

interface Schema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
  additionalProperties?: boolean;
}

export const validateRequestList = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (schema.required) {
      for (const field of schema.required) {
        if (!(field in data)) {
          return res.status(400).json({
            error: 'Validation Error',
            message: `Missing required field: ${field}`,
          });
        }
      }
    }

    for (const [key, rules] of Object.entries(schema.properties)) {
      if (key in data) {
        const value = data[key];

        if (rules.type === 'string' && typeof value !== 'string') {
          return res.status(400).json({
            error: 'Validation Error',
            message: `Field '${key}' must be a string`,
          });
        }

        if (rules.type === 'string' && typeof value === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            return res.status(400).json({
              error: 'Validation Error',
              message: `Field '${key}' must be at least ${rules.minLength} characters`,
            });
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            return res.status(400).json({
              error: 'Validation Error',
              message: `Field '${key}' must be at most ${rules.maxLength} characters`,
            });
          }
        }
      }
    }

    next();
  };
};