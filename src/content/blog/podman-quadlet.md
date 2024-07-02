---
title: "使用 Systemd 运行 Podman"
description: "使用 Systemd 运行 Podman"
pubDate: "2024-04-02"
---

Podman 作为 docker 的替代品，其一大特点就是没有 daemon（守护进程），它直接将容器作为一个进程运行在系统中。那么很自然的，本地的容器服务将会由 systemd 来管理。Podman 曾经使用`podman generate systemd`来生成 systemd 文件，在 4.4 版本，podman 合并了 Quadlet，使得 使用 systemd 管理容器变得更加简单。

## 在 Podman 中使用 Quadlet

首先你需要在如下位置创建一个 CTRNAME.container unit file

```
/usr/share/containers/systemd/
/etc/containers/systemd/
# rootless
$HOME/.config/containers/systemd/
```

随后就可以使用类似 systemd unit 的语法来创建一个 unit 文件

```
# cat $HOME/.config/containers/systemd/mysleep.container
[Unit]
Description=The sleep container
After=local-fs.target

[Container]
Image=registry.access.redhat.com/ubi9-minimal:latest
Exec=sleep 1000

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

在 [Container] 部分，通过 Image 指定需要的镜像，然后 Exec 指定运行的命令。其他的部分和 systemd 的规则完全相同。

在创建完 unit 以后，使用如下命令同步 unit file。

```
systemctl --user daemon-reload
```

这将会根据 mysleep.container 文件创建 mysleep.service

```
$ systemctl --user status mysleep.service
○ mysleep.service - The sleep container
 	Loaded: loaded (/home/dwalsh/.config/containers/systemd/mysleep.container; generated)
 	Active: inactive (dead)
```

随后就像管理正常的 systemd unit 一样使用

```
$ systemctl --user start mysleep.service
```

就可以正常运行了。
其他命令比如 `systemctl --user status mysleep.service` , `systemctl --user enable mysleep.service` 都是一样的

在 podman 安装时，他会注册一个 systemd-generator，负责查看上述文件夹里的文件并调用/usr/libexec/podman/quadlet 来生成 systemd 文件。
除了 .containers 文件，Quadlet 还支持其他类型的 unit file

- .kube 允许你指定一个 Kubernetes.yaml 文件，该文件告诉 Quadlet 创建一个服务文件，基于 Kubernetes 运行 systemd 服务下的 pods 和容器。
- .network 告诉 Quadlet 创建一个服务文件，该文件定义了一个 Podman 容器网络设备。这些网络设备然后可以在 .container 和 .kube 单元文件中使用。
- .volume 告诉 Quadlet 创建一个服务文件，该文件定义了一个 Podman 卷。这些卷然后可以在 .container 单元文件中使用。

## 另外一个例子

```
[Unit]
Description=traefik container
After=network-online.target

[Container]
Image=docker.io/traefik:v3.0
Volume=/var/run/docker.sock:/var/run/docker.sock
Volume=/etc/traefik:/etc/traefik
PublishPort=80:80

[Service]
Restart=always
TimeoutStartSec=900

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

```
[Unit]
Description=whoami container
After=network-online.target

[Container]
Image=docker.io/traefik/whoami:v1.10
Label="traefik.http.routers.whoami.rule=Path(`/iamwho`)
[Service]
Restart=always
TimeoutStartSec=900

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

Quadlet 允许以声明式的方式在 systemd 下运行容器。类似于 Compose 或 Kubernetes 文件，你可以声明你想要运行什么，而无需处理运行工作负载的所有复杂性。Podman 有着与现代 Linux 系统良好集成的悠久历史，而 Quadlet 将这种集成推向了新的高度。欢迎大家尝试。
