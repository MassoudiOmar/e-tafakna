const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/question.routes");
const usersRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const reset = require("./routes/resetPassord");
const answersRoutes = require("./routes/answers.routes");
const contractRoutes = require("./routes/contract.routes");
const contractRoutess = require("./routes/contract2.routes");
const usersContractsRoutes = require("./routes/users_has_contracts.routes");
const signature = require("./routes/signature.routes");
const notifFCM = require("./routes/SendNotifFCM.routes");
const cors = require("cors");
const paginate = require("express-paginate");
const contractTypeRoutes = require("./routes/contractType.routes");
const contractTypeQuestionsRoutes = require("./routes/contraType.questions.routes");
const login = require("./routes/login");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ limit: "5000mb" }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(paginate.middleware(10, 50));
app.use("/api/send", usersContractsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", reset);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);
app.use("/api/users", login);
app.use("/api/answers", answersRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/signature", signature);
app.use("/api", contractRoutess);
app.use("/api/throw", notifFCM);
app.use("/uploads", express.static("./uploads"));
app.get("/", (req, res) => {
  res.send(`
  <!doctype html><html lang="fr"><head><title>État HTTP 500 – Erreur interne du serveur</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>État HTTP 500 – Erreur interne du serveur</h1><hr class="line" /><p><b>Type</b> Rapport d'exception</p><p><b>message</b> com.google.common.io.BaseEncoding$DecodingException: Invalid input length 61</p><p><b>description</b> Le serveur a rencontré une erreur interne qui l'a empêché de satisfaire la requête.</p><p><b>exception</b></p><pre>java.lang.IllegalArgumentException: com.google.common.io.BaseEncoding$DecodingException: Invalid input length 61
	com.google.common.io.BaseEncoding.decode(BaseEncoding.java:214)
	eu.europa.esig.dss.utils.impl.GoogleGuavaUtils.fromBase64(GoogleGuavaUtils.java:224)
	eu.europa.esig.dss.utils.Utils.fromBase64(Utils.java:156)
	tn.com.ance.tunsign.utils.FileTypeUtil.getImageType(FileTypeUtil.java:27)
	tn.com.ance.tunsign.admin.web.cxf.RestAdminTunsignServiceImpl.createDigiGoUser(RestAdminTunsignServiceImpl.java:1052)
	sun.reflect.GeneratedMethodAccessor240.invoke(Unknown Source)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:498)
	org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:333)
	org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:99)
	org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:282)
	org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:96)
	org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:213)
	com.sun.proxy.$Proxy116.createDigiGoUser(Unknown Source)
	sun.reflect.GeneratedMethodAccessor240.invoke(Unknown Source)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:498)
	org.apache.cxf.service.invoker.AbstractInvoker.performInvocation(AbstractInvoker.java:179)
	org.apache.cxf.service.invoker.AbstractInvoker.invoke(AbstractInvoker.java:96)
	org.apache.cxf.jaxrs.JAXRSInvoker.invoke(JAXRSInvoker.java:192)
	org.apache.cxf.jaxrs.JAXRSInvoker.invoke(JAXRSInvoker.java:103)
	org.apache.cxf.interceptor.ServiceInvokerInterceptor$1.run(ServiceInvokerInterceptor.java:59)
	org.apache.cxf.interceptor.ServiceInvokerInterceptor.handleMessage(ServiceInvokerInterceptor.java:96)
	org.apache.cxf.phase.PhaseInterceptorChain.doIntercept(PhaseInterceptorChain.java:308)
	org.apache.cxf.transport.ChainInitiationObserver.onMessage(ChainInitiationObserver.java:121)
	org.apache.cxf.transport.http.AbstractHTTPDestination.invoke(AbstractHTTPDestination.java:267)
	org.apache.cxf.transport.servlet.ServletController.invokeDestination(ServletController.java:234)
	org.apache.cxf.transport.servlet.ServletController.invoke(ServletController.java:208)
	org.apache.cxf.transport.servlet.ServletController.invoke(ServletController.java:160)
	org.apache.cxf.transport.servlet.CXFNonSpringServlet.invoke(CXFNonSpringServlet.java:216)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.handleRequest(AbstractHTTPServlet.java:301)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.doPost(AbstractHTTPServlet.java:220)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:681)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.service(AbstractHTTPServlet.java:276)
	org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:317)
	org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:127)
	org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:91)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:114)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:137)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:111)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:170)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.session.ConcurrentSessionFilter.doFilter(ConcurrentSessionFilter.java:155)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:200)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:66)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.access.channel.ChannelProcessingFilter.doFilter(ChannelProcessingFilter.java:157)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:214)
	org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:177)
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:347)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:263)
</pre><p><b>cause mère</b></p><pre>com.google.common.io.BaseEncoding$DecodingException: Invalid input length 61
	com.google.common.io.BaseEncoding$Base64Encoding.decodeTo(BaseEncoding.java:921)
	com.google.common.io.BaseEncoding.decodeChecked(BaseEncoding.java:228)
	com.google.common.io.BaseEncoding.decode(BaseEncoding.java:212)
	eu.europa.esig.dss.utils.impl.GoogleGuavaUtils.fromBase64(GoogleGuavaUtils.java:224)
	eu.europa.esig.dss.utils.Utils.fromBase64(Utils.java:156)
	tn.com.ance.tunsign.utils.FileTypeUtil.getImageType(FileTypeUtil.java:27)
	tn.com.ance.tunsign.admin.web.cxf.RestAdminTunsignServiceImpl.createDigiGoUser(RestAdminTunsignServiceImpl.java:1052)
	sun.reflect.GeneratedMethodAccessor240.invoke(Unknown Source)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:498)
	org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:333)
	org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:99)
	org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:282)
	org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:96)
	org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:213)
	com.sun.proxy.$Proxy116.createDigiGoUser(Unknown Source)
	sun.reflect.GeneratedMethodAccessor240.invoke(Unknown Source)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:498)
	org.apache.cxf.service.invoker.AbstractInvoker.performInvocation(AbstractInvoker.java:179)
	org.apache.cxf.service.invoker.AbstractInvoker.invoke(AbstractInvoker.java:96)
	org.apache.cxf.jaxrs.JAXRSInvoker.invoke(JAXRSInvoker.java:192)
	org.apache.cxf.jaxrs.JAXRSInvoker.invoke(JAXRSInvoker.java:103)
	org.apache.cxf.interceptor.ServiceInvokerInterceptor$1.run(ServiceInvokerInterceptor.java:59)
	org.apache.cxf.interceptor.ServiceInvokerInterceptor.handleMessage(ServiceInvokerInterceptor.java:96)
	org.apache.cxf.phase.PhaseInterceptorChain.doIntercept(PhaseInterceptorChain.java:308)
	org.apache.cxf.transport.ChainInitiationObserver.onMessage(ChainInitiationObserver.java:121)
	org.apache.cxf.transport.http.AbstractHTTPDestination.invoke(AbstractHTTPDestination.java:267)
	org.apache.cxf.transport.servlet.ServletController.invokeDestination(ServletController.java:234)
	org.apache.cxf.transport.servlet.ServletController.invoke(ServletController.java:208)
	org.apache.cxf.transport.servlet.ServletController.invoke(ServletController.java:160)
	org.apache.cxf.transport.servlet.CXFNonSpringServlet.invoke(CXFNonSpringServlet.java:216)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.handleRequest(AbstractHTTPServlet.java:301)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.doPost(AbstractHTTPServlet.java:220)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:681)
	org.apache.cxf.transport.servlet.AbstractHTTPServlet.service(AbstractHTTPServlet.java:276)
	org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:317)
	org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:127)
	org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:91)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:114)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:137)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:111)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:170)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.session.ConcurrentSessionFilter.doFilter(ConcurrentSessionFilter.java:155)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:200)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:66)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.access.channel.ChannelProcessingFilter.doFilter(ChannelProcessingFilter.java:157)
	org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:331)
	org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:214)
	org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:177)
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:347)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:263)
</pre><p><b>note</b> La trace complète de la cause mère de cette erreur est disponible dans les fichiers journaux de ce serveur.</p><hr class="line" /><h3>Apache Tomcat/8.5.77</h3></body></html>
  `);
});

app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});
