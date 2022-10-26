import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtils {
  public capitalize(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }

  public toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  public toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  public toSnakeCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }

  public toPascalCase(str: string): string {
    return this.capitalize(this.toCamelCase(str));
  }

  public toConstantCase(str: string): string {
    return this.toSnakeCase(str).toUpperCase();
  }

  public toSentenceCase(str: string): string {
    return this.capitalize(str);
  }

  public toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => this.capitalize(txt));
  }

  public toDotCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
  }

  public toPathCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
  }

  public toHeaderCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  public toNoCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }

  public toParamCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  public toPlural(str: string): string {
    return str + 's';
  }

  public toSingular(str: string): string {
    return str.replace(/s$/, '');
  }

  public toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  public toLowerCase(str: string): string {
    return str.toLowerCase();
  }
}
