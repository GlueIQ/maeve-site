import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { benchmarkData } from '../mockData';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function BenchmarkInsights() {
  return (
    <ViewTransition viewKey="benchmarks">
      <div>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600,
          display: 'block', marginBottom: '8px',
        }}>Analytics</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
          color: 'var(--forest)', letterSpacing: '-0.02em', marginBottom: '32px',
        }}>Benchmark Insights</h1>

        {/* Benchmark Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px', marginBottom: '32px',
        }}>
          {benchmarkData.benchmarkCards.map((card, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              padding: '24px', boxShadow: 'var(--shadow-xs)',
              border: '1px solid rgba(0,26,14,0.06)',
            }}>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '11px',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--espresso)', opacity: 0.4, marginBottom: '8px',
              }}>{card.label}</div>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: '28px',
                fontWeight: 300, color: 'var(--forest)', marginBottom: '4px',
                letterSpacing: '-0.02em',
              }}>{card.value}</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <TrendingUp size={12} color="#22c55e" />
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '12px',
                  color: '#22c55e', fontWeight: 600,
                }}>{card.delta}</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '11px',
                  color: 'var(--espresso)', opacity: 0.3,
                }}>vs industry ({card.benchmark})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '24px', marginBottom: '24px',
        }}>
          {/* Retention Bar Chart */}
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            padding: '28px', boxShadow: 'var(--shadow-xs)',
            border: '1px solid rgba(0,26,14,0.06)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: '18px',
              fontWeight: 400, color: 'var(--forest)', marginBottom: '20px',
            }}>Client Retention Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={benchmarkData.retention} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sandstone)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'var(--font-sans)', fill: 'var(--espresso)' }} />
                <YAxis tick={{ fontSize: 12, fontFamily: 'var(--font-sans)', fill: 'var(--espresso)' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px', border: '1px solid var(--sandstone)',
                    fontFamily: 'var(--font-sans)', fontSize: '13px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {benchmarkData.retention.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Transition Distribution Pie */}
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            padding: '28px', boxShadow: 'var(--shadow-xs)',
            border: '1px solid rgba(0,26,14,0.06)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: '18px',
              fontWeight: 400, color: 'var(--forest)', marginBottom: '20px',
            }}>Transition Type Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={benchmarkData.transitionTypes}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
                  dataKey="value" paddingAngle={3}
                >
                  {benchmarkData.transitionTypes.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px', border: '1px solid var(--sandstone)',
                    fontFamily: 'var(--font-sans)', fontSize: '13px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-sans)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Line Chart */}
        <div style={{
          background: 'white', borderRadius: 'var(--radius-xl)',
          padding: '28px', boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)', fontSize: '18px',
            fontWeight: 400, color: 'var(--forest)', marginBottom: '20px',
          }}>Average Client Engagement Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={benchmarkData.engagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sandstone)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'var(--font-sans)', fill: 'var(--espresso)' }} />
              <YAxis tick={{ fontSize: 12, fontFamily: 'var(--font-sans)', fill: 'var(--espresso)' }} unit=" hrs" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px', border: '1px solid var(--sandstone)',
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                }}
              />
              <Line
                type="monotone" dataKey="hours"
                stroke="var(--gold)" strokeWidth={3}
                dot={{ fill: 'var(--gold)', strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, fill: 'var(--gold)', stroke: 'var(--forest)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ViewTransition>
  );
}
