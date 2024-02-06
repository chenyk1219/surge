#!/bin/env python3
# -*- coding: utf-8 -*-
import datetime
import requests
import os


# 获取中国域名
def get_china_domain():
    china_domain_list_url = 'https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master/accelerated-domains.china.conf'

    china_domain_filename = os.path.join('dist', 'ChinaDomain.list')
    always_real_ip_filename = os.path.join('dist', 'RealIP.list')
    # china_domain_filename = 'ChinaDomain.list'

    china_domain_list = requests.request('GET', china_domain_list_url).text.split('\n')
    with open(china_domain_filename, 'wb') as file:
        for china_domain in china_domain_list:
            try:
                china_domain_rule = 'DOMAIN-SUFFIX,' + china_domain.split('/')[1] + '\n'
                file.write(china_domain_rule.encode())
            except:
                continue

    with open(always_real_ip_filename, 'wb') as file:
        for china_domain in china_domain_list:
            try:
                china_domain_rule = china_domain.split('/')[1] + ','
                file.write(china_domain_rule.encode())
            except:
                continue


# 获取中国IP
def get_china_ip():
    china_ip_list_url = 'https://raw.githubusercontent.com/Hackl0us/GeoIP2-CN/release/CN-ip-cidr.txt'
    china_ip_list_filename = os.path.join('dist', 'ChinaIP.list')
    # china_ip_list_filename = 'ChinaIP.list'

    china_ip_list = requests.request('GET', china_ip_list_url).text.split('\n')
    with open(china_ip_list_filename, 'wb') as file:
        for china_ip in china_ip_list:
            if china_ip:
                china_ip_rule = 'IP-CIDR,' + china_ip + ',no-resolve\n'
                file.write(china_ip_rule.encode())
            continue


# 获取规则修正
def unbreak():
    unbreak_filename = os.path.join('dist', 'UnBreak.list')
    unbreak_set = set()
    unbreak_url_list = ['https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Unbreak.list',
                        'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list',
                        'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Direct/Direct.list',
                        'https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Surge/Ruleset/Unbreak.list']

    for unbreak_url in unbreak_url_list:
        unbreak_list = requests.request('GET', unbreak_url).text.split('\n')
        for unbreak in unbreak_list:
            if not unbreak.startswith('#'):
                unbreak_set.add(unbreak) if unbreak.find('/') == -1 else unbreak_set.add(unbreak.split('/')[0])
    with open(unbreak_filename, 'wb') as file:
        for unbreak_url in unbreak_set:
            unbreak_url = unbreak_url + '\n'
            file.write(unbreak_url.encode())


def get_ad_module():
    ad_module_url = 'https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/rewrite/chongxie.txt'
    filename = os.path.join('dist', 'ad.sgmodule')
    ad_url_rewrite_set = set()
    ad_hostname_set = set()
    version = datetime.datetime.now().strftime("%Y.%m.%d")
    description = f"#!name=广告拦截合集-重写\n\
#!desc= 100%套用：https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/rewrite/chongxie.txt，将qx的规则转写成surge的模块\n\
#!system=ios\n\
# @chenyk1219\n\
# 更新日期：{version}\n\
# 版本：{version}\n\n\n"
    ad_list = requests.request('GET', ad_module_url).text.split('\n')
    for ad in ad_list:
        if ad and not ad.startswith('#'):
            ad_hostname_set.add(ad) if ad.startswith('hostname') else ad_url_rewrite_set.add(ad)

    with open(filename, 'wb') as file:
        file.write(description.encode())
        file.write(b'[URL Rewrite]\n')
        for ad in ad_url_rewrite_set:
            ad = ad.split(' ')[0] + ' - reject\n'
            file.write(ad.encode())
        file.write(b'\n\n')
        file.write(b'[MITM]\n')
        for hostname in ad_hostname_set:
            print(hostname)
            hostname = hostname.split('=')[1]
            file.write('hostname = %APPEND% '.encode())
            file.write(hostname.encode())


def adg():
    adg_url = 'https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt'
    adg_list = requests.request('GET', adg_url).text.split('\n')
    ad_filename = os.path.join('dist', 'adg.list')
    unblocking_filename = os.path.join('dist', 'Unblocking.list')
    ad_set = set()
    unblocking_set = set()
    for adg in adg_list:
        if adg and adg.startswith('||'):
            ad_set.add('DOMAIN-SUFFIX,' + adg.strip('||^'))
        if adg and adg.startswith('@@||'):
            unblocking_set.add('DOMAIN-SUFFIX,' + adg.strip('@@||^|'))
        if adg and adg.startswith('|') and not adg.startswith('||'):
            ad_set.add('DOMAIN,' + adg.strip('|^'))
    with open(ad_filename, 'wb') as file:
        for ad in ad_set:
            file.write(ad.encode())
            file.write(b'\n')
    with open(unblocking_filename, 'wb') as file:
        for unblocking in unblocking_set:
            file.write(unblocking.encode())
            file.write(b'\n')


if __name__ == '__main__':
    if not os.path.exists("dist"):
        os.makedirs("dist")

    get_china_ip()
    get_china_domain()
    unbreak()
    get_ad_module()
    adg()
