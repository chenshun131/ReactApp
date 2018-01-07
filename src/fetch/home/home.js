import { get } from '../get'

/**
 * 获取广告信息
 */
export function getAdData() {
    return get('/api/homead');
}

/**
 * 通过城市获取列表信息
 * @param city
 * @param page
 */
export function getListData(city, page) {
    return get(`/api/homelist/${encodeURIComponent(city)}/${page}`);
}
