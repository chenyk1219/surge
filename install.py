#!/bin/env python3
# -*- coding: utf-8 -*-
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


if __name__ == '__main__':
    if not os.path.exists("dist"):
        os.makedirs("dist")

    get_china_ip()
    get_china_domain()
    unbreak()
