FROM ubuntu:trusty-20160217

# Derived from https://github.com/heroku/stack-images/blob/master/Dockerfile

RUN echo 'deb http://archive.ubuntu.com/ubuntu trusty main' >/etc/apt/sources.list &&\
    echo 'deb http://archive.ubuntu.com/ubuntu trusty-security main' >>/etc/apt/sources.list &&\
    echo 'deb http://archive.ubuntu.com/ubuntu trusty-updates main' >>/etc/apt/sources.list &&\
    echo 'deb http://archive.ubuntu.com/ubuntu trusty universe' >>/etc/apt/sources.list &&\

    apt-get update &&\
    apt-get dist-upgrade -y &&\

    apt-get install -y --force-yes \
      autoconf \
      bind9-host \
      bison \
      build-essential \
      coreutils \
      curl \
      daemontools \
      dnsutils \
      ed \
      git \
      imagemagick \
      iputils-tracepath \
      language-pack-aa \
      language-pack-af \
      language-pack-am \
      language-pack-an \
      language-pack-ar \
      language-pack-as \
      language-pack-ast \
      language-pack-az \
      language-pack-be \
      language-pack-bem \
      language-pack-ber \
      language-pack-bg \
      language-pack-bho \
      language-pack-bn \
      language-pack-bo \
      language-pack-br \
      language-pack-bs \
      language-pack-ca \
      language-pack-crh \
      language-pack-cs \
      language-pack-csb \
      language-pack-cv \
      language-pack-cy \
      language-pack-da \
      language-pack-de \
      language-pack-dv \
      language-pack-dz \
      language-pack-el \
      language-pack-en \
      language-pack-eo \
      language-pack-es \
      language-pack-et \
      language-pack-eu \
      language-pack-fa \
      language-pack-ff \
      language-pack-fi \
      language-pack-fil \
      language-pack-fo \
      language-pack-fr \
      language-pack-fur \
      language-pack-fy \
      language-pack-ga \
      language-pack-gd \
      language-pack-gl \
      language-pack-gu \
      language-pack-gv \
      language-pack-ha \
      language-pack-he \
      language-pack-hi \
      language-pack-hne \
      language-pack-hr \
      language-pack-hsb \
      language-pack-ht \
      language-pack-hu \
      language-pack-hy \
      language-pack-ia \
      language-pack-id \
      language-pack-ig \
      language-pack-is \
      language-pack-it \
      language-pack-ja \
      language-pack-ka \
      language-pack-kk \
      language-pack-kl \
      language-pack-km \
      language-pack-kn \
      language-pack-ko \
      language-pack-ks \
      language-pack-ku \
      language-pack-kw \
      language-pack-ky \
      language-pack-lb \
      language-pack-lg \
      language-pack-li \
      language-pack-lo \
      language-pack-lt \
      language-pack-lv \
      language-pack-mai \
      language-pack-mg \
      language-pack-mhr \
      language-pack-mi \
      language-pack-mk \
      language-pack-ml \
      language-pack-mn \
      language-pack-mr \
      language-pack-ms \
      language-pack-mt \
      language-pack-my \
      language-pack-nan \
      language-pack-nb \
      language-pack-nds \
      language-pack-ne \
      language-pack-nl \
      language-pack-nn \
      language-pack-nso \
      language-pack-oc \
      language-pack-om \
      language-pack-or \
      language-pack-os \
      language-pack-pa \
      language-pack-pap \
      language-pack-pl \
      language-pack-ps \
      language-pack-pt \
      language-pack-ro \
      language-pack-ru \
      language-pack-rw \
      language-pack-sa \
      language-pack-sc \
      language-pack-sd \
      language-pack-se \
      language-pack-shs \
      language-pack-si \
      language-pack-sk \
      language-pack-sl \
      language-pack-so \
      language-pack-sq \
      language-pack-sr \
      language-pack-ss \
      language-pack-st \
      language-pack-sv \
      language-pack-sw \
      language-pack-ta \
      language-pack-te \
      language-pack-tg \
      language-pack-th \
      language-pack-ti \
      language-pack-tk \
      language-pack-tl \
      language-pack-tr \
      language-pack-ts \
      language-pack-tt \
      language-pack-ug \
      language-pack-uk \
      language-pack-ur \
      language-pack-uz \
      language-pack-ve \
      language-pack-vi \
      language-pack-wa \
      language-pack-wae \
      language-pack-wo \
      language-pack-xh \
      language-pack-yi \
      language-pack-yo \
      language-pack-zh-hans \
      language-pack-zh-hant \
      language-pack-zu \
      libbz2-dev \
      libcurl4-openssl-dev \
      libevent-dev \
      libglib2.0-dev \
      libjpeg-dev \
      libmagickwand-dev \
      libmysqlclient-dev \
      libncurses5-dev \
      libpq-dev \
      libpq5 \
      libreadline6-dev \
      libssl-dev \
      libxml2-dev \
      libxslt-dev \
      netcat-openbsd \
      openjdk-7-jdk \
      openjdk-7-jre-headless \
      openssh-client \
      openssh-server \
      postgresql-server-dev-9.3 \
      python \
      python-dev \
      ruby \
      ruby-dev \
      socat \
      stunnel \
      syslinux \
      tar \
      telnet \
      zip \
      zlib1g-dev \
      pigz &&\

    rm /etc/ssh/ssh_host_*
