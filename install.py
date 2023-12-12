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


if __name__ == '__main__':

    get_china_ip()
    get_china_domain()
