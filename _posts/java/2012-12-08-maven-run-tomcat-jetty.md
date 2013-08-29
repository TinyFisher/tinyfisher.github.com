---
layout: post
title: 通过 maven 启动 tomcat, jetty
category: java
tags: [java, tomcat, maven, jetty]
keywords: java, tomcat, maven, jetty
description: 通过 maven 启动 tomcat, jetty
---

## 配置maven

直接在`pom`里面添加一个`plugin`节点就行

<pre class="prettyprint linenums">
&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            ...
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;
</pre>

需要变更版本只需要修改`version`即可

### Tomcat 6

<pre class="prettyprint linenums">
&lt;plugin&gt;
    &lt;groupId&gt;org.apache.tomcat.maven&lt;/groupId&gt;
    &lt;artifactId&gt;tomcat6-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;2.0&lt;/version&gt;
    &lt;configuration&gt;
        &lt;path&gt;/&lt;/path&gt;
        &lt;port&gt;8080&lt;/port&gt;
        &lt;uriEncoding&gt;UTF-8&lt;/uriEncoding&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</pre>

### Tomcat 7

<pre class="prettyprint linenums">
&lt;plugin&gt;
    &lt;groupId&gt;org.apache.tomcat.maven&lt;/groupId&gt;
    &lt;artifactId&gt;tomcat7-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;2.0&lt;/version&gt;
    &lt;configuration&gt;
        &lt;path&gt;/&lt;/path&gt;
        &lt;port&gt;8080&lt;/port&gt;
        &lt;uriEncoding&gt;UTF-8&lt;/uriEncoding&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</pre>

### jetty 老的配置

<pre class="prettyprint linenums">
&lt;plugin&gt;
    &lt;groupId&gt;org.mortbay.jetty&lt;/groupId&gt;
    &lt;artifactId&gt;maven-jetty-plugin&lt;/artifactId&gt;
    &lt;version&gt;6.1.26&lt;/version&gt;
    &lt;configuration&gt;
        &lt;connectors&gt;
            &lt;connector implementation="org.mortbay.jetty.nio.SelectChannelConnector"&gt;
                &lt;port&gt;8080&lt;/port&gt;
            &lt;/connector&gt;
        &lt;/connectors&gt;
        &lt;contextPath&gt;/&lt;/contextPath&gt;
        &lt;scanIntervalSeconds&gt;10&lt;/scanIntervalSeconds&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</pre>

### jetty 新的配置

<pre class="prettyprint linenums">
&lt;plugin&gt;
    &lt;groupId&gt;org.mortbay.jetty&lt;/groupId&gt;
    &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;8.1.8.v20121106&lt;/version&gt;
    &lt;configuration&gt;
        &lt;connectors&gt;
            &lt;connector implementation="org.eclipse.jetty.server.nio.SelectChannelConnector"&gt;
                &lt;port&gt;8080&lt;/port&gt;
            &lt;/connector&gt;
        &lt;/connectors&gt;
        &lt;systemProperties&gt;
            &lt;systemProperty&gt;
                &lt;name&gt;org.eclipse.jetty.util.URI.charset&lt;/name&gt;
                &lt;value&gt;UTF-8&lt;/value&gt;
            &lt;/systemProperty&gt;
        &lt;/systemProperties&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</pre>
