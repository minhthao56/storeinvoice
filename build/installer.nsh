!macro customInstall
  CreateDirectory $LOCALAPPDATA\app-pdf-ts
  CopyFiles $INSTDIR\production.db $LOCALAPPDATA\app-pdf-ts
  Delete $INSTDIR\production.db
!macroend