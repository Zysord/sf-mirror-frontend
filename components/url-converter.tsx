"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Copy, CheckCircle, AlertCircle, ExternalLink, Globe, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const MIRROR_SITES = [
  {
    id: "cloudflare",
    name: "CloudFlare (推荐)",
    domain: "sf-proxy-api.sord.top",
    description: "CF-Workers镜像站，最稳定",
    reliability: "99.9%",
  },
  {
    id: "liquidtelecom",
    name: "Liquid Telecom (SourceForge官方）",
    domain: "liquidtelecom.dl.sourceforge.net",
    description: "非洲/欧洲优化",
    reliability: "99.9%",
  },
  {
    id: "netactuate",
    name: "NetActuate (SourceForge官方）",
    domain: "netactuate.dl.sourceforge.net",
    description: "北美优化",
    reliability: "99.9%",
  },
  {
    id: "pilotfiber",
    name: "Pilot Fiber (SourceForge官方）",
    domain: "pilotfiber.dl.sourceforge.net",
    description: "亚太优化",
    reliability: "99.9%",
  },
]

export function UrlConverter() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [mirrorUrl, setMirrorUrl] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [selectedMirror, setSelectedMirror] = useState("cloudflare")
  const { toast } = useToast()

  // SourceForge URL validation
  const validateSourceForgeUrl = (url: string): boolean => {
    if (!url) return true // Empty is valid (no error state)

    try {
      const urlObj = new URL(url)
      return urlObj.hostname === "sourceforge.net" || urlObj.hostname.endsWith(".sourceforge.net")
    } catch {
      return false
    }
  }

  // Convert SourceForge URL to direct mirror URL
  const convertUrl = async () => {
    if (!originalUrl.trim()) {
      toast({
        title: "请输入URL",
        description: "请输入有效的 SourceForge 下载链接",
        variant: "destructive",
      })
      return
    }

    if (!validateSourceForgeUrl(originalUrl)) {
      setIsValidUrl(false)
      toast({
        title: "无效的URL",
        description: "请输入有效的 SourceForge 链接",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)
    setIsValidUrl(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const url = new URL(originalUrl)
      const selectedMirrorSite = MIRROR_SITES.find((m) => m.id === selectedMirror)

      if (!selectedMirrorSite) {
        throw new Error("未找到选定的镜像站")
      }

      let convertedUrl = ""

      // 所有镜像统一转换逻辑
      let mirrorPath = ""

      if (url.pathname.includes("/projects/") && url.pathname.includes("/files/")) {
        // Extract project name and file path
        const pathMatch = url.pathname.match(/\/projects\/([^/]+)\/files\/(.+?)(?:\/download)?$/)
        if (pathMatch) {
          const [, projectName, filePath] = pathMatch
          mirrorPath = `/project/${projectName}/${filePath}`
        }
      } else if (url.hostname.includes("downloads.sourceforge.net") && url.pathname.startsWith("/project/")) {
        // Already in project format
        mirrorPath = url.pathname
      }

      if (!mirrorPath) {
        throw new Error("无法解析URL格式")
      }

      convertedUrl = `https://${selectedMirrorSite.domain}${mirrorPath}?viasf=1`

      if (!convertedUrl) {
        throw new Error("无法生成镜像链接")
      }

      setMirrorUrl(convertedUrl)

      toast({
        title: "转换成功",
        description: `已生成 ${selectedMirrorSite.name} 镜像直链`,
      })
    } catch (error) {
      console.log("[v0] URL转换错误:", error)
      toast({
        title: "转换失败",
        description: "请检查URL格式是否正确",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
    }
  }

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "复制成功",
        description: "链接已复制到剪贴板",
      })
    } catch (error) {
      toast({
        title: "复制失败",
        description: "请手动复制链接",
        variant: "destructive",
      })
    }
  }

  // Handle input change
  const handleInputChange = (value: string) => {
    setOriginalUrl(value)
    setIsValidUrl(validateSourceForgeUrl(value))
    if (mirrorUrl) {
      setMirrorUrl("") // Clear mirror URL when input changes
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          镜像链接生成器
        </CardTitle>
        <CardDescription>粘贴 SourceForge 下载链接，选择镜像站获取直接下载链接</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">原始 SourceForge 链接</label>
          <div className="relative">
            <Input
              placeholder="https://sourceforge.net/projects/example/files/..."
              className={`font-mono text-sm pr-10 ${!isValidUrl ? "border-destructive" : ""}`}
              value={originalUrl}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {originalUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidUrl ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
            )}
          </div>
          {!isValidUrl && <p className="text-sm text-destructive">请输入有效的 SourceForge 链接</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4" />
            选择镜像站
          </label>
          <Select value={selectedMirror} onValueChange={setSelectedMirror}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MIRROR_SITES.map((mirror) => (
                <SelectItem key={mirror.id} value={mirror.id}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{mirror.name}</span>
                      <span className="text-xs text-muted-foreground">{mirror.description}</span>
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {mirror.reliability}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            不同镜像站可能未同步所有文件。如果下载失败，请尝试其他镜像站或使用主镜像站。镜像站直链无需代理，速度更快。
          </AlertDescription>
        </Alert>

        <Button className="w-full" onClick={convertUrl} disabled={isConverting || !originalUrl.trim() || !isValidUrl}>
          {isConverting ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              生成镜像直链
            </>
          )}
        </Button>

        {mirrorUrl && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">镜像直链</label>
            <div className="flex gap-2">
              <Input value={mirrorUrl} readOnly className="font-mono text-sm bg-muted" />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(mirrorUrl)}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => window.open(mirrorUrl, "_blank")}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                直接访问 {MIRROR_SITES.find((m) => m.id === selectedMirror)?.name || "选定镜像"} 镜像
              </div>
              <Badge variant="secondary" className="text-xs">
                无代理直连
              </Badge>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">支持的链接格式示例:</h4>
          <div className="space-y-1 text-xs text-muted-foreground font-mono">
            <div>• https://sourceforge.net/projects/project-name/files/...</div>
            <div>• https://downloads.sourceforge.net/project/...</div>
            <div>• https://sourceforge.net/projects/project-name/files/file.zip/download</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
