export const THEME_KEY = "raw-theme";

// Скрипт для <head>: ставит сохранённую тему до первой отрисовки, без вспышки
export const themeScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'){document.documentElement.dataset.theme='light';document.querySelector('meta[name=theme-color]')?.setAttribute('content','#f3f1ec')}}catch(e){}`;
