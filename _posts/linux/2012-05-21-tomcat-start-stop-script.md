---
layout: post
title: linux tomcat 脚本
category: linux
tags: [shell, linux, tomcat, script]
keywords: linux,tomcat,start,stop,script,shell
description: linux下tomcat启动关闭脚本
---


    #!/bin/bash

    PID=`ps -ef | grep tomcat | grep java | grep ClassLoaderLogManager | grep -v grep | awk '{print $2}'`

    tomcat_log() {
      tail -f $CATALINA_HOME/logs/catalina.out
    }

    tomcat_start() {
      if [ -z $PID ]; then
        echo "[start] start tomcat!"
        $CATALINA_HOME/bin/startup.sh
      else
        echo "[start] tomcat is run!"
      fi
    }

    tomcat_stop() {
      if [ -n $PID ]; then
        $CATALINA_HOME/bin/shutdown.sh
      else
        echo "[stop] tomcat is not run!"
      fi
    }

    tomcat_kill() {
      if [ -z $PID ]; then
        echo "[kill] tomcat is not run!"
      else
        echo "[kill] kill tomcat!"
        kill -9 $PID
      fi
    }

    case $1 in
      log)
        tomcat_log
      ;;
      start)
        tomcat_start
      ;;
      stop)
        tomcat_stop
      ;;
      kill)
        tomcat_kill
      ;;
      pid)
        if [ -z $PID ]; then
          echo "[pid] tomcat is not run!"
        else
          echo $PID
        fi
      ;;
      *)
        echo "default args is start!"
        tomcat_start
      ;;
    esac

