Add-Type -AssemblyName System.Drawing

function Create-CalcIcon {
    param(
        [int]$size,
        [string]$outputPath
    )

    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # Background: Rounded rectangle with royal blue gradient
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(255, 30, 64, 175), # #1E40AF Royal Blue
        [System.Drawing.Color]::FromArgb(255, 14, 165, 233), # #0EA5E9 Sky Blue
        [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
    )

    $radius = [int]($size * 0.22)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc(0, 0, $d, $d, 180, 90)
    $path.AddArc($size - $d - 1, 0, $d, $d, 270, 90)
    $path.AddArc($size - $d - 1, $size - $d - 1, $d, $d, 0, 90)
    $path.AddArc(0, $size - $d - 1, $d, $d, 90, 90)
    $path.CloseFigure()

    $g.FillPath($brush, $path)

    # Calculator inner body (white silhouette or stylized C + math symbols)
    # Calculator screen (Emerald Green accent)
    $screenX = [int]($size * 0.20)
    $screenY = [int]($size * 0.18)
    $screenW = [int]($size * 0.60)
    $screenH = [int]($size * 0.22)
    $screenRadius = [int]($size * 0.06)
    if ($screenRadius -lt 2) { $screenRadius = 2 }

    $screenPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $sd = $screenRadius * 2
    $screenPath.AddArc($screenX, $screenY, $sd, $sd, 180, 90)
    $screenPath.AddArc($screenX + $screenW - $sd, $screenY, $sd, $sd, 270, 90)
    $screenPath.AddArc($screenX + $screenW - $sd, $screenY + $screenH - $sd, $sd, $sd, 0, 90)
    $screenPath.AddArc($screenX, $screenY + $screenH - $sd, $sd, $sd, 90, 90)
    $screenPath.CloseFigure()

    $screenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129)) # #10B981 Emerald
    $g.FillPath($screenBrush, $screenPath)

    # White dot on screen (digit display simulation)
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $dotSize = [int]($size * 0.08)
    if ($dotSize -lt 2) { $dotSize = 2 }
    $g.FillEllipse($dotBrush, ($screenX + $screenW - $dotSize - [int]($size * 0.05)), ($screenY + [int]($screenH / 2) - [int]($dotSize / 2)), $dotSize, $dotSize)

    # 4 Keypad Buttons (White rounded squares)
    $btnMargin = [int]($size * 0.06)
    $btnW = [int](($screenW - $btnMargin) / 2)
    $btnH = $btnW
    $btnY1 = [int]($size * 0.48)
    $btnY2 = [int]($btnY1 + $btnH + $btnMargin)

    $btnX1 = $screenX
    $btnX2 = $screenX + $btnW + $btnMargin

    $keyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
    $accentKeyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36)) # #FBBF24 Amber/Gold (= key)

    # Key 1: + (top-left)
    $g.FillRectangle($keyBrush, $btnX1, $btnY1, $btnW, $btnH)
    # Key 2: - (top-right)
    $g.FillRectangle($keyBrush, $btnX2, $btnY1, $btnW, $btnH)
    # Key 3: x (bottom-left)
    $g.FillRectangle($keyBrush, $btnX1, $btnY2, $btnW, $btnH)
    # Key 4: = (bottom-right - golden accent)
    $g.FillRectangle($accentKeyBrush, $btnX2, $btnY2, $btnW, $btnH)

    # Draw mathematical symbols on keys if size >= 32
    if ($size -ge 32) {
        $fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
        $fontSize = [float]($size * 0.16)
        $font = New-Object System.Drawing.Font($fontFamily, $fontSize, [System.Drawing.FontStyle]::Bold)
        $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 64, 175))
        $equalBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 146, 64, 14))

        $sf = New-Object System.Drawing.StringFormat
        $sf.Alignment = [System.Drawing.StringAlignment]::Center
        $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

        $r1 = New-Object System.Drawing.RectangleF($btnX1, $btnY1, $btnW, $btnH)
        $r2 = New-Object System.Drawing.RectangleF($btnX2, $btnY1, $btnW, $btnH)
        $r3 = New-Object System.Drawing.RectangleF($btnX1, $btnY2, $btnW, $btnH)
        $r4 = New-Object System.Drawing.RectangleF($btnX2, $btnY2, $btnW, $btnH)

        $g.DrawString("+", $font, $textBrush, $r1, $sf)
        $g.DrawString("-", $font, $textBrush, $r2, $sf)
        $g.DrawString("×", $font, $textBrush, $r3, $sf)
        $g.DrawString("=", $font, $equalBrush, $r4, $sf)

        $font.Dispose()
        $textBrush.Dispose()
        $equalBrush.Dispose()
        $sf.Dispose()
    }

    $g.Dispose()
    $brush.Dispose()
    $path.Dispose()
    $screenPath.Dispose()
    $screenBrush.Dispose()
    $dotBrush.Dispose()
    $keyBrush.Dispose()
    $accentKeyBrush.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created $outputPath ($size x $size)"
}

# Create PNG icons
Create-CalcIcon -size 48 -outputPath "D:\calculator\public\icon-48x48.png"
Create-CalcIcon -size 96 -outputPath "D:\calculator\public\icon-96x96.png"
Create-CalcIcon -size 180 -outputPath "D:\calculator\public\apple-touch-icon.png"
Create-CalcIcon -size 192 -outputPath "D:\calculator\public\icon-192x192.png"
Create-CalcIcon -size 512 -outputPath "D:\calculator\public\icon-512x512.png"

# Create ICO file from 48x48
$bmp48 = [System.Drawing.Bitmap]::FromFile("D:\calculator\public\icon-48x48.png")
$iconHandle = $bmp48.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$stream = [System.IO.File]::OpenWrite("D:\calculator\public\favicon.ico")
$icon.Save($stream)
$stream.Close()
$icon.Dispose()
$bmp48.Dispose()
Write-Host "Created D:\calculator\public\favicon.ico"
