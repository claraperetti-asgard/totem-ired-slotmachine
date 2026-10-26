# totem-ired-slotmachine

App do totem (React + Vite) empacotado para Android com Capacitor.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Android

```bash
npm run android:sync   # build do site + cópia para o projeto Android
npm run android:open   # abre a pasta android/ no Android Studio
npm run android:apk    # gera o APK release assinado
```

O APK sai em `android/app/build/outputs/apk/release/app-release.apk`.

Rode `npm run android:sync` sempre que mudar algo em `src/` antes de gerar o
APK pelo Android Studio: o site compilado não fica no git.

### Assinatura

O release é assinado com `android/app/release.jks`, cuja senha fica em
`android/keystore.properties`. Os dois ficam fora do git. **Guarde uma cópia
em lugar seguro**: sem essa chave não é possível instalar uma atualização por
cima do app já instalado no totem (só desinstalando antes).

### Modo totem

- tela cheia, sem barra de status nem de navegação
- tela sempre acesa e travada em retrato
- botão voltar desligado
- o app pode ser escolhido como **tela inicial** do Android: ao apertar home
  pela primeira vez depois de instalar, escolha "Slot Machine Ired" →
  "Sempre". Assim ele abre sozinho quando o totem liga.
