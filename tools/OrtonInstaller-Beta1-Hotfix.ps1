param(
[Parameter(Mandatory=$true)][string]$PayloadPath,
[Parameter(Mandatory=$true)][string]$IconPath,
[Parameter(Mandatory=$true)][string]$BootstrapperPath,
[string]$Mode = 'install'
)
$ErrorActionPreference = 'Stop'
try {
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class OrtonDpi {
[DllImport("user32.dll")] public static extern bool SetProcessDpiAwarenessContext(IntPtr value);
}
"@ -ErrorAction Stop
[void][OrtonDpi]::SetProcessDpiAwarenessContext([IntPtr](-4))
} catch {}
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Xaml
$ProductName = 'Orton'
$ProductVersion='6.0.0-beta.1'
$Publisher = 'Vitor Monte Vaz'
$InstallDir = Join-Path $env:LOCALAPPDATA 'Programs\Orton'
$UserDataDir = Join-Path $env:LOCALAPPDATA 'Vitor Monte Vaz\Orton'
$LogDir = Join-Path $UserDataDir 'Installer'
$LogPath = Join-Path $LogDir 'setup.log'
$StartMenuLink = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Orton.lnk'
$DesktopLink = Join-Path ([Environment]::GetFolderPath('Desktop')) 'Orton.lnk'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
function Write-SetupLog([string]$Message) {
try { ('[{0:yyyy-MM-dd HH:mm:ss}] {1}' -f (Get-Date), $Message) | Add-Content -LiteralPath $LogPath -Encoding UTF8 } catch {}
}
trap {
try { Write-SetupLog ('FALHA NÃO TRATADA: ' + $_.Exception.ToString()) } catch {}
try { [System.Windows.MessageBox]::Show(('O instalador encontrou um erro inesperado.`n`n' + $_.Exception.Message + '`n`nLog: ' + $LogPath), 'Orton — Instalação', [System.Windows.MessageBoxButton]::OK, [System.Windows.MessageBoxImage]::Error) | Out-Null } catch {}
exit 1
}
if ($Mode -eq 'uninstall') {
$choice = [System.Windows.MessageBox]::Show(
'Deseja remover o Orton deste computador?`n`nSeus temas, histórico e preferências pessoais serão preservados.',
'Desinstalar Orton',
[System.Windows.MessageBoxButton]::YesNo,
[System.Windows.MessageBoxImage]::Question
)
if ($choice -ne [System.Windows.MessageBoxResult]::Yes) { exit 0 }
try { Get-Process 'Orton.App' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue } catch {}
Remove-Item -LiteralPath $StartMenuLink -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $DesktopLink -Force -ErrorAction SilentlyContinue
Remove-Item 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Orton' -Recurse -Force -ErrorAction SilentlyContinue
$escaped = $InstallDir.Replace("'", "''")
$cleanup = "Start-Sleep -Milliseconds 900; Remove-Item -LiteralPath '$escaped' -Recurse -Force -ErrorAction SilentlyContinue"
Start-Process -FilePath "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe" -ArgumentList @('-NoProfile','-WindowStyle','Hidden','-ExecutionPolicy','Bypass','-Command',$cleanup) -WindowStyle Hidden | Out-Null
[System.Windows.MessageBox]::Show('Orton foi removido. Seus dados pessoais foram preservados.','Orton',[System.Windows.MessageBoxButton]::OK,[System.Windows.MessageBoxImage]::Information) | Out-Null
exit 0
}
[xml]$xaml = @'
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
Width="900" Height="590"
WindowStartupLocation="CenterScreen"
WindowStyle="None" ResizeMode="NoResize"
Background="#0B0D12" Foreground="#F7F8FC"
FontFamily="Segoe UI" SnapsToDevicePixels="True"
UseLayoutRounding="True" Title="Orton — Instalação">
<Window.Resources>
<SolidColorBrush x:Key="MutedBrush" Color="#9DA4B3" />
<SolidColorBrush x:Key="PanelBrush" Color="#141821" />
<SolidColorBrush x:Key="StrokeBrush" Color="#2A303C" />
<LinearGradientBrush x:Key="AccentBrush" StartPoint="0,0" EndPoint="1,1">
<GradientStop Color="#8B79FF" Offset="0"/>
<GradientStop Color="#5F7BFF" Offset="1"/>
</LinearGradientBrush>
<Style x:Key="PrimaryButton" TargetType="Button">
<Setter Property="Foreground" Value="White"/>
<Setter Property="FontSize" Value="15"/>
<Setter Property="FontWeight" Value="SemiBold"/>
<Setter Property="Cursor" Value="Hand"/>
<Setter Property="Height" Value="50"/>
<Setter Property="Padding" Value="24,0"/>
<Setter Property="Background" Value="{StaticResource AccentBrush}"/>
<Setter Property="BorderThickness" Value="0"/>
<Setter Property="Template">
<Setter.Value>
<ControlTemplate TargetType="Button">
<Border x:Name="Root" CornerRadius="14" Background="{TemplateBinding Background}">
<Border.Effect>
<DropShadowEffect BlurRadius="24" ShadowDepth="7" Opacity="0.30" Color="#5F7BFF"/>
</Border.Effect>
<ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
</Border>
<ControlTemplate.Triggers>
<Trigger Property="IsMouseOver" Value="True"><Setter TargetName="Root" Property="Opacity" Value="0.92"/></Trigger>
<Trigger Property="IsPressed" Value="True"><Setter TargetName="Root" Property="Opacity" Value="0.78"/></Trigger>
<Trigger Property="IsEnabled" Value="False"><Setter TargetName="Root" Property="Opacity" Value="0.45"/></Trigger>
</ControlTemplate.Triggers>
</ControlTemplate>
</Setter.Value>
</Setter>
</Style>
<Style x:Key="GhostButton" TargetType="Button">
<Setter Property="Foreground" Value="#D8DCE6"/>
<Setter Property="Background" Value="#171B24"/>
<Setter Property="BorderBrush" Value="#303644"/>
<Setter Property="BorderThickness" Value="1"/>
<Setter Property="FontSize" Value="14"/>
<Setter Property="Cursor" Value="Hand"/>
<Setter Property="Height" Value="50"/>
<Setter Property="Padding" Value="20,0"/>
<Setter Property="Template">
<Setter.Value>
<ControlTemplate TargetType="Button">
<Border x:Name="Root" CornerRadius="14" Background="{TemplateBinding Background}" BorderBrush="{TemplateBinding BorderBrush}" BorderThickness="{TemplateBinding BorderThickness}">
<ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
</Border>
<ControlTemplate.Triggers>
<Trigger Property="IsMouseOver" Value="True"><Setter TargetName="Root" Property="Background" Value="#202633"/></Trigger>
<Trigger Property="IsPressed" Value="True"><Setter TargetName="Root" Property="Opacity" Value="0.72"/></Trigger>
</ControlTemplate.Triggers>
</ControlTemplate>
</Setter.Value>
</Setter>
</Style>
</Window.Resources>
<Grid>
<Ellipse Width="430" Height="430" HorizontalAlignment="Right" VerticalAlignment="Top" Margin="0,-210,-170,0" IsHitTestVisible="False">
<Ellipse.Fill><RadialGradientBrush><GradientStop Color="#3F6B62FF" Offset="0"/><GradientStop Color="#006B62FF" Offset="1"/></RadialGradientBrush></Ellipse.Fill>
<Ellipse.Effect><BlurEffect Radius="80"/></Ellipse.Effect>
</Ellipse>
<Ellipse Width="340" Height="340" HorizontalAlignment="Left" VerticalAlignment="Bottom" Margin="-170,0,0,-190" IsHitTestVisible="False">
<Ellipse.Fill><RadialGradientBrush><GradientStop Color="#2F3D8BFF" Offset="0"/><GradientStop Color="#003D8BFF" Offset="1"/></RadialGradientBrush></Ellipse.Fill>
<Ellipse.Effect><BlurEffect Radius="80"/></Ellipse.Effect>
</Ellipse>
<Grid.RowDefinitions><RowDefinition Height="48"/><RowDefinition Height="*"/></Grid.RowDefinitions>
<Border Grid.Row="0" x:Name="DragArea" Background="#0D1016" BorderBrush="#252A34" BorderThickness="0,0,0,1">
<Grid Margin="18,0">
<Grid.ColumnDefinitions><ColumnDefinition Width="*"/><ColumnDefinition Width="36"/></Grid.ColumnDefinitions>
<StackPanel Orientation="Horizontal" VerticalAlignment="Center">
<Image x:Name="BrandIcon" Width="24" Height="24" Margin="0,0,10,0"/>
<TextBlock Text="Orton — Instalação" FontSize="14" Foreground="#E7E9F0" VerticalAlignment="Center"/>
</StackPanel>
<Button Grid.Column="1" x:Name="CloseButton" Content="×" FontSize="22" Style="{StaticResource GhostButton}" Padding="0"/>
</Grid>
</Border>
<Grid Grid.Row="1" Margin="54,38,54,42">
<Grid.ColumnDefinitions><ColumnDefinition Width="1.16*"/><ColumnDefinition Width="0.84*"/></Grid.ColumnDefinitions>
<StackPanel Grid.Column="0" Margin="0,0,38,0">
<TextBlock Text="Instale o Orton" FontSize="38" FontWeight="SemiBold" Foreground="#FFFFFF"/>
<TextBlock Text="Organizador + Explorador + Scanner" FontSize="17" Foreground="#B6BDCA" Margin="0,8,0,0"/>
<TextBlock Text="Uma instalação limpa, por usuário, sem exigir .NET pré-instalado. Seus dados e preferências são preservados." TextWrapping="Wrap" FontSize="13" Foreground="#8E97A8" Margin="0,18,0,0" Width="475" HorizontalAlignment="Left"/>
<Border Background="#121620" BorderBrush="#252B37" BorderThickness="1" CornerRadius="18" Padding="20" Margin="0,28,0,0">
<StackPanel>
<TextBlock Text="Orton completo" FontSize="16" FontWeight="SemiBold"/>
<TextBlock Text="Três módulos integrados e prontos para uso." Foreground="#8F99AA" FontSize="12" Margin="0,4,0,0"/>
</StackPanel>
</Border>
<Border Background="#121620" BorderBrush="#252B37" BorderThickness="1" CornerRadius="18" Padding="20" Margin="0,14,0,0">
<StackPanel>
<TextBlock Text="Atualizações seguras" FontSize="16" FontWeight="SemiBold"/>
<TextBlock Text="Preferências e dados pessoais são preservados." Foreground="#8F99AA" FontSize="12" Margin="0,4,0,0"/>
</StackPanel>
</Border>
</StackPanel>
<Border Grid.Column="1" Background="#10141C" BorderBrush="#262C38" BorderThickness="1" CornerRadius="22" Padding="24">
<Grid>
<Grid.RowDefinitions><RowDefinition Height="Auto"/><RowDefinition Height="Auto"/><RowDefinition Height="Auto"/><RowDefinition Height="*"/><RowDefinition Height="Auto"/></Grid.RowDefinitions>
<TextBlock Text="Destino" Foreground="#8E97A8" FontSize="11"/>
<Border Grid.Row="1" Background="#171C26" CornerRadius="12" Padding="14,11" Margin="0,8,0,0">
<TextBlock x:Name="InstallPathText" FontSize="10.5" Foreground="#C3C8D2" TextTrimming="CharacterEllipsis"/>
</Border>
<CheckBox Grid.Row="2" x:Name="DesktopShortcut" Content="Criar atalho na Área de Trabalho" IsChecked="True" Foreground="#D4D8E0" FontSize="12" Margin="0,18,0,0"/>
<StackPanel Grid.Row="3" VerticalAlignment="Center" Margin="0,22,0,22">
<Grid x:Name="ProgressTrack" Height="8" Background="#202632">
<Border x:Name="ProgressFill" Width="0" HorizontalAlignment="Left" CornerRadius="4" Background="{StaticResource AccentBrush}"/>
</Grid>
<Grid Margin="0,10,0,0">
<TextBlock x:Name="StatusText" Text="Pronto para instalar" Foreground="#B7BFCD" FontSize="11"/>
<TextBlock x:Name="PercentText" Text="0%" Foreground="#7F8999" FontSize="10" HorizontalAlignment="Right"/>
</Grid>
</StackPanel>
<StackPanel Grid.Row="4">
<Button x:Name="InstallButton" Content="Instalar Orton" Style="{StaticResource PrimaryButton}"/>
<Button x:Name="CancelButton" Content="Agora não" Style="{StaticResource GhostButton}" Margin="0,11,0,0"/>
<TextBlock Text="Desenvolvido por Vitor Monte Vaz" HorizontalAlignment="Center" Foreground="#6E7686" FontSize="10" Margin="0,18,0,0"/>
</StackPanel>
</Grid>
</Border>
</Grid>
</Grid>
</Window>
'@
$reader = New-Object System.Xml.XmlNodeReader $xaml
$window = [Windows.Markup.XamlReader]::Load($reader)
function N([string]$Name) { return $window.FindName($Name) }
$brandIcon = N 'BrandIcon'
$closeButton = N 'CloseButton'
$dragArea = N 'DragArea'
$installPathText = N 'InstallPathText'
$desktopShortcut = N 'DesktopShortcut'
$progressTrack = N 'ProgressTrack'
$progressFill = N 'ProgressFill'
$statusText = N 'StatusText'
$percentText = N 'PercentText'
$installButton = N 'InstallButton'
$cancelButton = N 'CancelButton'
$installPathText.Text = $InstallDir
try {
$bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
$bitmap.BeginInit()
$bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
$bitmap.UriSource = New-Object System.Uri($IconPath)
$bitmap.EndInit()
$bitmap.Freeze()
$brandIcon.Source = $bitmap
$window.Icon = $bitmap
} catch { Write-SetupLog ('Falha ao carregar ícone: ' + $_.Exception.Message) }
$script:Installing = $false
$script:Installed = $false
$script:PublishProcess = $null
$script:PublishStdout = $null
$script:PublishStderr = $null
$script:TempRoot = $null
$script:PublishStarted = [DateTime]::MinValue
function Set-Progress([int]$Percent, [string]$Text) {
if ($Percent -lt 0) { $Percent = 0 }
if ($Percent -gt 100) { $Percent = 100 }
$statusText.Text = $Text
$percentText.Text = "$Percent%"
$trackWidth = $progressTrack.ActualWidth
if ($trackWidth -le 0) { $trackWidth = 252 }
$target = [Math]::Max(0, [Math]::Min($trackWidth, $trackWidth * $Percent / 100.0))
$animation = New-Object System.Windows.Media.Animation.DoubleAnimation
$animation.From = $progressFill.ActualWidth
$animation.To = $target
$animation.Duration = [System.Windows.Duration]::new([TimeSpan]::FromMilliseconds(260))
$animation.EasingFunction = New-Object System.Windows.Media.Animation.QuadraticEase
$progressFill.BeginAnimation([System.Windows.FrameworkElement]::WidthProperty, $animation)
}
function Fail-Install([string]$Message) {
Write-SetupLog ('ERRO: ' + $Message)
$script:Installing = $false
$installButton.IsEnabled = $true
$cancelButton.IsEnabled = $true
$installButton.Content = 'Tentar novamente'
$statusText.Text = 'Não foi possível concluir a instalação'
$percentText.Text = '—'
[System.Windows.MessageBox]::Show($Message + "`n`nLog: $LogPath", 'Orton — Instalação', [System.Windows.MessageBoxButton]::OK, [System.Windows.MessageBoxImage]::Error) | Out-Null
}
function New-Shortcut([string]$Path, [string]$Target) {
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($Path)
$shortcut.TargetPath = $Target
$shortcut.WorkingDirectory = Split-Path -Parent $Target
$shortcut.IconLocation = "$Target,0"
$shortcut.Description = 'Orton'
$shortcut.Save()
}
function Register-Orton([string]$AppExe, [string]$Uninstaller) {
$key = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Orton'
New-Item -Path $key -Force | Out-Null
Set-ItemProperty -Path $key -Name DisplayName -Value 'Orton'
Set-ItemProperty -Path $key -Name DisplayVersion -Value $ProductVersion
Set-ItemProperty -Path $key -Name Publisher -Value $Publisher
Set-ItemProperty -Path $key -Name InstallLocation -Value $InstallDir
Set-ItemProperty -Path $key -Name DisplayIcon -Value "$AppExe,0"
Set-ItemProperty -Path $key -Name UninstallString -Value ('"{0}" /uninstall' -f $Uninstaller)
Set-ItemProperty -Path $key -Name NoModify -Type DWord -Value 1
Set-ItemProperty -Path $key -Name NoRepair -Type DWord -Value 1
}
function Finish-Install {
try {
Set-Progress 76 'Atualizando os arquivos'
$running = @(Get-Process 'Orton.App' -ErrorAction SilentlyContinue)
$running | Stop-Process -Force -ErrorAction SilentlyContinue
foreach ($p in $running) { try { [void]$p.WaitForExit(5000) } catch {} }
Start-Sleep -Milliseconds 300
$replaced = $false
for ($attempt=0; $attempt -lt 10; $attempt++) {
try {
if (Test-Path $InstallDir) { Remove-Item $InstallDir -Recurse -Force -ErrorAction Stop }
New-Item -ItemType Directory -Force $InstallDir -ErrorAction Stop | Out-Null
Copy-Item (Join-Path $script:TempRoot 'publish\*') $InstallDir -Recurse -Force -ErrorAction Stop
$replaced = $true; break
} catch { Start-Sleep -Milliseconds 450 }
}
if (-not $replaced) { throw 'Ainda há um arquivo do Orton em uso. Feche o Orton e clique em Tentar novamente.' }
Set-Progress 88 'Criando atalhos e registrando o Orton'
$appExe = Join-Path $InstallDir 'Orton.App.exe'
if (-not (Test-Path -LiteralPath $appExe)) { throw 'Orton.App.exe não foi encontrado após a publicação.' }
Copy-Item -LiteralPath $BootstrapperPath -Destination (Join-Path $InstallDir 'Orton_Uninstall.exe') -Force
New-Shortcut -Path $StartMenuLink -Target $appExe
if ($desktopShortcut.IsChecked -eq $true) { New-Shortcut -Path $DesktopLink -Target $appExe } else { Remove-Item -LiteralPath $DesktopLink -Force -ErrorAction SilentlyContinue }
Register-Orton -AppExe $appExe -Uninstaller (Join-Path $InstallDir 'Orton_Uninstall.exe')
Set-Progress 100 'Orton 6 Beta 1 instalado e pronto para usar'
$script:Installing = $false
$script:Installed = $true
$installButton.IsEnabled = $true
$cancelButton.IsEnabled = $true
$installButton.Content = 'Abrir Orton'
$cancelButton.Content = 'Fechar'
Write-SetupLog 'Instalação concluída com sucesso.'
} catch {
Fail-Install $_.Exception.Message
}
}
$timer = New-Object System.Windows.Threading.DispatcherTimer
$timer.Interval = [TimeSpan]::FromMilliseconds(220)
$timer.Add_Tick({
if ($null -eq $script:PublishProcess) { return }
try {
if (-not $script:PublishProcess.HasExited) {
$elapsed = ([DateTime]::Now - $script:PublishStarted).TotalSeconds
$pseudo = 22 + [Math]::Min(47, [int]($elapsed * 1.5))
Set-Progress $pseudo 'Preparando o Orton para este computador'
return
}
$timer.Stop()
try { $script:PublishProcess.WaitForExit() } catch {}
$exitCode = $script:PublishProcess.ExitCode
$script:PublishProcess.Dispose()
$script:PublishProcess = $null
$publishOut = Join-Path $LogDir 'publish-output.log'
$publishErr = Join-Path $LogDir 'publish-error.log'
$stdout = if (Test-Path -LiteralPath $publishOut) { Get-Content -LiteralPath $publishOut -Raw -ErrorAction SilentlyContinue } else { '' }
$stderr = if (Test-Path -LiteralPath $publishErr) { Get-Content -LiteralPath $publishErr -Raw -ErrorAction SilentlyContinue } else { '' }
if ($stdout) { Write-SetupLog $stdout }
if ($stderr) { Write-SetupLog $stderr }
$publishedExe = Join-Path $script:TempRoot 'publish\Orton.App.exe'
$publishedDll = Join-Path $script:TempRoot 'publish\Orton.App.dll'
$payloadValid = (Test-Path -LiteralPath $publishedExe) -and (Test-Path -LiteralPath $publishedDll)
if ($payloadValid) {
try {
$exeLength = (Get-Item -LiteralPath $publishedExe -ErrorAction Stop).Length
$dllLength = (Get-Item -LiteralPath $publishedDll -ErrorAction Stop).Length
$payloadValid = ($exeLength -gt 0 -and $dllLength -gt 0)
} catch { $payloadValid = $false }
}
if ($exitCode -ne 0 -and -not $payloadValid) {
Write-SetupLog "dotnet publish terminou com código $exitCode e sem payload válido."
$combined = ($stderr + "`n" + $stdout) -split "`r?`n"
$errors = @($combined | Where-Object { $_ -match '(?i)(error|erro|failed|falhou|exception|MSB\d{4}|NETSDK\d{4})' } | Select-Object -First 2)
$detail = if ($errors.Count -gt 0) { ($errors -join "`n") } else { "Código de saída do compilador: $exitCode" }
Fail-Install ("Não foi possível preparar os arquivos do Orton.`n`n$detail`n`nDetalhes completos foram salvos no log.")
return
}
if (-not $payloadValid) {
Write-SetupLog "dotnet publish terminou com código $exitCode, mas Orton.App.exe/Orton.App.dll não foram encontrados."
Fail-Install 'A publicação terminou, mas os arquivos finais do Orton não foram encontrados. Consulte o log do instalador.'
return
}
if ($exitCode -ne 0) {
Write-SetupLog "AVISO: dotnet publish retornou código $exitCode, porém o payload publicado foi validado. Prosseguindo com a instalação."
}
Finish-Install
} catch {
$timer.Stop()
Fail-Install $_.Exception.Message
}
})
function Begin-Install {
if ($script:Installed) {
$exe = Join-Path $InstallDir 'Orton.App.exe'
if (-not (Test-Path -LiteralPath $exe)) {
$script:Installed = $false
$installButton.Content = 'Reparar instalação'
Fail-Install 'O executável instalado não foi encontrado. Use Reparar instalação para restaurar o Orton.'
return
}
try {
Write-SetupLog ("Abrindo Orton: $exe")
$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = $exe
$startInfo.WorkingDirectory = $InstallDir
$startInfo.UseShellExecute = $true
$process = [System.Diagnostics.Process]::Start($startInfo)
if ($null -eq $process) { throw 'O Windows não retornou um processo para o Orton.' }
$window.Close()
} catch {
Write-SetupLog ('Falha ao abrir Orton: ' + $_.Exception.ToString())
[System.Windows.MessageBox]::Show(
("O Orton foi instalado, mas não foi possível abri-lo automaticamente.`n`n" + $_.Exception.Message + "`n`nVocê também pode iniciá-lo pelo Menu Iniciar.`n`nLog: $LogPath"),
'Orton — Instalação',
[System.Windows.MessageBoxButton]::OK,
[System.Windows.MessageBoxImage]::Warning
) | Out-Null
}
return
}
if ($script:Installing) { return }
try {
$script:Installing = $true
$installButton.IsEnabled = $false
$cancelButton.IsEnabled = $false
$installButton.Content = 'Instalando…'
Set-Progress 5 'Verificando os componentes necessários'
Write-SetupLog 'Iniciando instalação do Orton 6 Beta 1.'
$script:TempRoot = Join-Path ([IO.Path]::GetTempPath()) ('OrtonSetup-' + [Guid]::NewGuid().ToString('N'))
$source = Join-Path $script:TempRoot 'source'
$publish = Join-Path $script:TempRoot 'publish'
$sdkDir = Join-Path $script:TempRoot 'dotnet'
New-Item -ItemType Directory -Force -Path $source, $publish | Out-Null
Set-Progress 10 'Extraindo os componentes'
Expand-Archive -LiteralPath $PayloadPath -DestinationPath $source -Force
$project = Join-Path $source 'src\Orton.App\Orton.App.csproj'
if (-not (Test-Path -LiteralPath $project)) { throw 'O pacote interno do Orton está incompleto.' }
$prepareScriptPath = Join-Path $script:TempRoot 'prepare.ps1'
$prepareScript = @'
param([string]$Project,[string]$Source,[string]$Publish,[string]$SdkDir)
$ErrorActionPreference='Stop'
function Get-OrtonDotnet {
$cmd=Get-Command dotnet.exe -ErrorAction SilentlyContinue
if($cmd){
try{
$v=(& $cmd.Source --version 2>$null | Select-Object -First 1)
$major=0
if($v){[void][int]::TryParse(($v -split '\.')[0],[ref]$major)}
if($major -ge 10){Write-Host "Usando SDK existente: $v";return $cmd.Source}
}catch{}
}
Write-Host 'SDK .NET 10 não encontrado. Baixando componentes privados do instalador...'
New-Item -ItemType Directory -Force -Path $SdkDir | Out-Null
$installer=Join-Path ([IO.Path]::GetTempPath()) ('orton-dotnet-install-'+[Guid]::NewGuid().ToString('N')+'.ps1')
try{
[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -UseBasicParsing -Uri 'https://dot.net/v1/dotnet-install.ps1' -OutFile $installer
& "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File $installer -Version '10.0.402' -InstallDir $SdkDir -NoPath | ForEach-Object { Write-Host $_ }
if($LASTEXITCODE -ne 0){throw "Falha ao obter o .NET 10 (código $LASTEXITCODE)."}
}finally{Remove-Item -LiteralPath $installer -Force -ErrorAction SilentlyContinue}
$local=Join-Path $SdkDir 'dotnet.exe'
if(-not(Test-Path -LiteralPath $local)){throw 'Não foi possível preparar o .NET 10 privado. Verifique sua conexão com a internet.'}
return $local
}
$dotnet=Get-OrtonDotnet
Write-Output 'Publicando o Orton como aplicativo autossuficiente...'
& $dotnet publish $Project -c Release -r win-x64 --self-contained true -p:PublishSingleFile=false -p:TreatWarningsAsErrors=false -p:NoWarn=AVLN3001 -p:PublishTrimmed=false -o $Publish --nologo -v:minimal
if($LASTEXITCODE -ne 0){exit $LASTEXITCODE}
exit 0
'@
Set-Content -LiteralPath $prepareScriptPath -Value $prepareScript -Encoding UTF8
$publishOut = Join-Path $LogDir 'publish-output.log'
$publishErr = Join-Path $LogDir 'publish-error.log'
Remove-Item -LiteralPath $publishOut,$publishErr -Force -ErrorAction SilentlyContinue
Set-Progress 20 'Preparando o Orton para este computador'
$prepareArgs=@(
'-NoProfile','-ExecutionPolicy','Bypass','-File',('"{0}"' -f $prepareScriptPath),
'-Project',('"{0}"' -f $project),
'-Source',('"{0}"' -f $source),
'-Publish',('"{0}"' -f $publish),
'-SdkDir',('"{0}"' -f $sdkDir)
)
$script:PublishProcess=Start-Process -FilePath "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe" -ArgumentList $prepareArgs -WorkingDirectory $source -WindowStyle Hidden -PassThru -RedirectStandardOutput $publishOut -RedirectStandardError $publishErr
if($null -eq $script:PublishProcess){throw 'Não foi possível iniciar a preparação dos arquivos.'}
$script:PublishStarted=[DateTime]::Now
$timer.Start()
} catch {
Fail-Install $_.Exception.Message
}
}
$dragArea.Add_MouseLeftButtonDown({ try { $window.DragMove() } catch {} })
$closeButton.Add_Click({
if ($script:Installing) {
[System.Windows.MessageBox]::Show('Aguarde a instalação terminar antes de fechar.','Orton',[System.Windows.MessageBoxButton]::OK,[System.Windows.MessageBoxImage]::Information) | Out-Null
} else { $window.Close() }
})
$cancelButton.Add_Click({ if (-not $script:Installing) { $window.Close() } })
$installButton.Add_Click({ Begin-Install })
$window.Add_Closing({ param($sender,$e) if ($script:Installing) { $e.Cancel = $true } })
$window.Add_Closed({
try { if ($script:TempRoot -and (Test-Path -LiteralPath $script:TempRoot)) { Remove-Item -LiteralPath $script:TempRoot -Recurse -Force -ErrorAction SilentlyContinue } } catch {}
})
Write-SetupLog 'Interface do instalador iniciada.'
[void]$window.ShowDialog()
exit 0
