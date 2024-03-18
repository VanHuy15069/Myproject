import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const cx = classNames.bind(styles);
function Chart({ data }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={cx('custom-tooltip')}>
                    <div className={cx('title')}>
                        <img
                            className={cx('img')}
                            src={`http://localhost:4000/src/${payload[0].payload.image}`}
                            alt=""
                        />
                        <div className={cx('info')}>
                            <p className={cx('music')}>{label}</p>
                            <p className={cx('singer')}>{payload[0].payload.singer}</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div style={{ marginRight: '4px' }}>Lượt nghe:</div>
                        <div style={{ color: payload[0].fill }}>{payload[0].value}</div>
                    </div>
                    <div className={cx('item')}>
                        <div style={{ marginRight: '4px' }}>Lượt thích:</div>
                        <div style={{ color: payload[1].fill }}>{payload[1].value}</div>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <LineChart
            width={1250}
            height={500}
            data={data}
            margin={{
                top: 5,
                right: 20,
                left: 30,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="musicName" tick={{ fill: '#8b45ca' }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="favorite" stroke="#82ca9d" activeDot={{ r: 6 }} />
        </LineChart>
    );
}
export default Chart;
