# Docker部署Firefox浏览器

**一键部署**  
```bash
docker run -d \
    --name=firefox \
    -p 5800:5800 \
    -v /docker/appdata/firefox:/config:rw \
    jlesage/firefox
```

解决中文乱码问题:
```bash
docker exec -it firefox /bin/sh
```
```bash
wget https://dl-cdn.alpinelinux.org/alpine/v3.19/community/x86_64/font-wqy-zenhei-0.9.45-r3.apk
```
```bash
apk add font-wqy-zenhei-0.9.45-r3.apk
```

### 开始使用
运行完成后，在浏览器输入 http://本地IP:5800进入浏览器
