import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'br.com.asgardtech.slotmachineired',
  appName: 'Slot Machine Ired',
  // saída do `vite build`, copiada para dentro do APK pelo `cap sync`
  webDir: 'dist',
  android: {
    // o fundo vermelho da marca aparece enquanto a WebView carrega,
    // no lugar do flash branco
    backgroundColor: '#bd0000',
  },
}

export default config
