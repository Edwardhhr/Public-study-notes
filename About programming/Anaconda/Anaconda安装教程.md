# Anaconda安装教程

### Anaconda简介
Anaconda 是一个开源的 Python 和 R 语言的发行版本，主要用于数据科学、机器学习和科学计算。它包含了大量的科学计算库和工具，并且提供了一个方便的环境管理工具，使得用户可以轻松地创建、管理和切换不同的 Python 环境。（我使用的原因是可以方便的切换python环境，每个环境包与包的版本不冲突，以及可以很方便的导入与导出包，最主要的原因是我的科研需要使用Deeplabcut,用anaconda比较方便）  

**Anaconda 的主要特点**
1. **包管理**：
- Anaconda 使用 conda 作为包管理工具，可以方便地安装、更新和删除 Python 包。

- 支持多种操作系统和平台（Windows、macOS、Linux）。

2. **环境管理**：
- Anaconda 允许用户创建独立的 Python 环境，每个环境可以有不同的 Python 版本和包依赖。

- 使用 
```
conda env
```
命令可以轻松创建、激活、删除和管理环境。

3. **集成开发环境（IDE）**：
- Anaconda 提供了 Jupyter Notebook 和 JupyterLab，这些工具非常适合数据分析和可视化。

- 还集成了 Spyder，一个专门为科学计算设计的 IDE。

4. **预装包：**
- Anaconda 发行版预装了大量的科学计算库，如 NumPy、Pandas、Matplotlib、SciPy、Scikit-learn 等。

- 还包括一些常用的数据科学工具，如 TensorFlow、PyTorch 等。

5. **社区支持：**
- Anaconda 有一个活跃的社区，用户可以在社区中获取帮助、分享经验和学习资源。

### Anaconda 的下载
在[Anaconda的官网](https://www.anaconda.com/download/success)上进行安装  
Anaconda可以在Windows、MacOS、Linux系统平台中安装和使用，下载的时候找到对应的点击即可  

或者使用[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/?C=M&O=D)下载

我的电脑是windows系统，我这里选择下载最新版本的**Anaconda3-2024.06-1-windows-x86_64.exe**下载完成我们就可以得到一个exe文件  


### Anaconda 的安装
下载完成后，只需要一步一步按照提示安装即可，以下说明安装过程中需要**特别注意的步骤** 

**Step1:直接点击next**

**Step2:点击 I Agree**

**Step3:选择 ALL users（选择仅个人的话，后面使用可能会报错）,然后点击next**

**Step4:选择Anaconda的安装位置**

> [Tips!]
> 这里建议修改为其他盘,要不然下载的包和创建的环境都在C盘，占用空间，我这里修为为F盘（专门安装软件的盘），后面介绍如何把创建的环境和下载的包都装在自己想装的盘里。

**Step5:这里把三个勾全部打上，然后点击Install,anaconda开始安装**

<pre>
🔒创建开始菜单
🔒base环境以python3.12创建
🔒清除包缓存
</pre>

**Step6:安装进行中，等待即可，这一步取决于电脑的性能**

**Step7: 点击【Next】——再次点击【Next】**

**Step8：接着来到最后一步，两个勾取消，不要框选。点击【Finish】**


### Anaconda环境变量的配置
电脑设置搜索栏搜索高级系统设置 → 选择环境变量 →  系统变量选择**path**，双击进入 →  新建环境变量【根据自己安装的盘，选择对应的盘  
```
D:\anaconda3
D:\anaconda3\Scripts
D:\anaconda3\Library\bin
D:\anaconda3\Library\mingw-w64\bin
```

在windows菜单栏搜索`Anaconda`,打开**anaconda prompt**  

输入这行代码，查看版本号，检查是否成功安装
```
conda --version
```
成功安装会显示Anaconda的版本号，这里anaconda就安装完成了，但是并没有结束，因为还涉及到环境和包的下载，这里默认是下载在C盘的，我们需要更改下载的位置，以免占C盘系统盘内存；最后再添加镜像源方便下载环境的包  


### Anaconda默认环境保存路径和下载源修改
因为更改环境保存路径和更改下载源都可以在`.condarc`文件中修改，这里一次性配置完  
打开上面的anaconda prompt命令窗口，输入:
```
conda info
```
没有修改的conda的pkgs和envs均保存在C盘，为了不占用系统盘的空间，我们需要修改保存的位置  

在C盘-用户-用户名，找到`.condarc`,如果找不到打开anaconda prompt输入以下命令:
```
conda config --set show_channel_urls yes
```
即可找到，用记事本打开  
删除其他的，输入以下指令【注意修改为自己想要安装的盘，我这里修改为F盘】  
```
envs_dirs:
  - F:\Anaconda3\envs
pkgs_dirs:
  - F:\Anaconda3\pkgs
```
CTRL + S保存

conda镜像源的配置，打开anaconda prompt，输入以下指令
**添加清华源**
```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
```
**添加阿里云镜像源**
```
conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/free/
conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/main/
```
**添加中科大源**
```
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
```
**设置搜索时显示通道地址（可选）**
```
conda config --set show_channel_urls yes
```

最后我们验证一下上面的内容是否成功配置
```
conda info
```
首先pkgs和envs都修改为F盘了  

其次我们看镜像源也成功配置  
